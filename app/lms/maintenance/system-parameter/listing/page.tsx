"use client"

import { useState } from "react"
import { useRouter } from "next/navigation"
import { useTranslation } from "@/contexts/TranslationContext"
import { useSystemParameter } from "@/contexts/SystemParameterContext"
import { DashboardHeader } from "@/components/dashboard-header"
import { Sidebar } from "@/components/sidebar"
import { MegaMenu } from "@/components/mega-menu"
import { DashboardFooter } from "@/components/dashboard-footer"
import { BreadcrumbNav } from "@/components/breadcrumb-nav"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Checkbox } from "@/components/ui/checkbox"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog"
import { Textarea } from "@/components/ui/textarea"
import { RefreshCw, Printer, LinkIcon, Eye, Edit, Trash2, Check, XIcon, Search, Plus } from "lucide-react"
import { useToast } from "@/hooks/use-toast"

export default function SystemParameterListingPage() {
  const { t } = useTranslation()
  const router = useRouter()
  const {
    getPendingRecords,
    getAuthorizedRecords,
    getRejectedRecords,
    getDisabledRecords,
    authorizeRecord,
    rejectRecord,
  } = useSystemParameter()
  const { toast } = useToast()

  const [sidebarOpen, setSidebarOpen] = useState(false)
  const [megaMenuOpen, setMegaMenuOpen] = useState(false)
  const [searchQuery, setSearchQuery] = useState("")
  const [rejectDialogOpen, setRejectDialogOpen] = useState(false)
  const [selectedRecordId, setSelectedRecordId] = useState<string | null>(null)
  const [rejectReason, setRejectReason] = useState("")

  const handleMegaMenuOpen = () => {
    setMegaMenuOpen(true)
    setSidebarOpen(false)
  }

  const handleAuthorize = (recordId: string) => {
    authorizeRecord(recordId, "admin.user")
    toast({
      title: "Success",
      description: "Record authorized successfully",
    })
  }

  const handleRejectClick = (recordId: string) => {
    setSelectedRecordId(recordId)
    setRejectDialogOpen(true)
  }

  const handleRejectConfirm = () => {
    if (!selectedRecordId) return

    if (!rejectReason.trim()) {
      toast({
        title: "Validation Error",
        description: "Please provide a reject reason",
        variant: "destructive",
      })
      return
    }

    rejectRecord(selectedRecordId, "admin.user", rejectReason)
    toast({
      title: "Success",
      description: "Record rejected successfully",
    })

    setRejectDialogOpen(false)
    setRejectReason("")
    setSelectedRecordId(null)
  }

  const breadcrumbItems = [
    { label: "System Parameter", href: "/lms" },
    { label: "LMS" },
    { label: "Maintenance" },
    { label: "System Parameter" },
  ]

  const pendingRecords = getPendingRecords()
  const authorizedRecords = getAuthorizedRecords()
  const rejectedRecords = getRejectedRecords()
  const disabledRecords = getDisabledRecords()

  return (
    <div className="min-h-screen flex flex-col bg-background">
      <DashboardHeader onMenuClick={() => setSidebarOpen(true)} onMegaMenuClick={handleMegaMenuOpen} />
      <Sidebar open={sidebarOpen} onClose={() => setSidebarOpen(false)} />
      <MegaMenu open={megaMenuOpen} onClose={() => setMegaMenuOpen(false)} />

      <main className="flex-1 pt-16 lg:ml-[384px] transition-all duration-300">
        <div className="container mx-auto px-6 py-6">
          <div className="flex items-center justify-between mb-4">
            <BreadcrumbNav items={breadcrumbItems} />
            <div className="flex items-center gap-2">
              <Button onClick={() => router.push("/lms/maintenance/system-parameter/initiate")} className="gap-2">
                <Plus className="h-4 w-4" />
                Initiate
              </Button>
              <Button variant="ghost" size="icon">
                <RefreshCw className="h-4 w-4" />
              </Button>
              <Button variant="ghost" size="icon">
                <Printer className="h-4 w-4" />
              </Button>
              <Button variant="ghost" size="icon">
                <LinkIcon className="h-4 w-4" />
              </Button>
            </div>
          </div>

          <div className="bg-card rounded-lg border border-border shadow-sm">
            <div className="p-6 border-b border-border">
              <h1 className="text-2xl font-semibold text-foreground">System Parameter Listing</h1>
            </div>

            <Tabs defaultValue="pending" className="w-full">
              <div className="px-6 pt-4">
                <TabsList className="grid w-full max-w-2xl grid-cols-4">
                  <TabsTrigger value="pending">Pending Authorization</TabsTrigger>
                  <TabsTrigger value="review">Review List</TabsTrigger>
                  <TabsTrigger value="rejected">Rejected List</TabsTrigger>
                  <TabsTrigger value="disabled">Disabled List</TabsTrigger>
                </TabsList>
              </div>

              <div className="p-6">
                <div className="flex items-center justify-between mb-4">
                  <div className="relative w-96">
                    <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                    <Input
                      type="search"
                      placeholder="Enter keyword to search"
                      className="pl-10 h-10"
                      value={searchQuery}
                      onChange={(e) => setSearchQuery(e.target.value)}
                    />
                  </div>
                </div>

                <TabsContent value="pending" className="mt-0">
                  {pendingRecords.length === 0 ? (
                    <div className="py-12 text-center text-muted-foreground">
                      No pending authorization records found.
                    </div>
                  ) : (
                    <>
                      <div className="border rounded-lg">
                        <Table>
                          <TableHeader>
                            <TableRow>
                              <TableHead className="w-12">
                                <Checkbox />
                              </TableHead>
                              <TableHead>Allowed Sweep Category</TableHead>
                              <TableHead>Allowed Currency</TableHead>
                              <TableHead>Structure Type</TableHead>
                              <TableHead>Allowed Sweep Type</TableHead>
                              <TableHead>Status</TableHead>
                              <TableHead>Maker</TableHead>
                              <TableHead>Maker Date Time</TableHead>
                              <TableHead className="text-right">Action</TableHead>
                            </TableRow>
                          </TableHeader>
                          <TableBody>
                            {pendingRecords.map((record) => (
                              <TableRow key={record.id}>
                                <TableCell>
                                  <Checkbox />
                                </TableCell>
                                <TableCell className="font-medium">{record.allowedSweepCategory.join(", ")}</TableCell>
                                <TableCell>{record.allowedCurrencies.join(", ")}</TableCell>
                                <TableCell>{record.structureType.join(", ")}</TableCell>
                                <TableCell>{record.allowedSweepType.join(", ")}</TableCell>
                                <TableCell>
                                  <span className="inline-flex items-center rounded-full bg-yellow-50 px-2 py-1 text-xs font-medium text-yellow-700 ring-1 ring-inset ring-yellow-600/20">
                                    {record.action}
                                  </span>
                                </TableCell>
                                <TableCell>{record.maker}</TableCell>
                                <TableCell className="text-sm text-muted-foreground">{record.makerDateTime}</TableCell>
                                <TableCell className="text-right">
                                  <div className="flex justify-end gap-2">
                                    <Button variant="ghost" size="icon" className="h-8 w-8">
                                      <Eye className="h-4 w-4" />
                                    </Button>
                                    <Button
                                      variant="ghost"
                                      size="icon"
                                      className="h-8 w-8 text-green-600 hover:text-green-700 hover:bg-green-50"
                                      onClick={() => handleAuthorize(record.id)}
                                    >
                                      <Check className="h-4 w-4" />
                                    </Button>
                                    <Button
                                      variant="ghost"
                                      size="icon"
                                      className="h-8 w-8 text-destructive hover:bg-destructive/10"
                                      onClick={() => handleRejectClick(record.id)}
                                    >
                                      <XIcon className="h-4 w-4" />
                                    </Button>
                                  </div>
                                </TableCell>
                              </TableRow>
                            ))}
                          </TableBody>
                        </Table>
                      </div>

                      <div className="flex items-center justify-between mt-4">
                        <p className="text-sm text-muted-foreground">
                          Showing 1 to {pendingRecords.length} of {pendingRecords.length} entries
                        </p>
                      </div>
                    </>
                  )}
                </TabsContent>

                <TabsContent value="review" className="mt-0">
                  {authorizedRecords.length === 0 ? (
                    <div className="py-12 text-center text-muted-foreground">No authorized records found.</div>
                  ) : (
                    <>
                      <div className="border rounded-lg">
                        <Table>
                          <TableHeader>
                            <TableRow>
                              <TableHead className="w-12">
                                <Checkbox />
                              </TableHead>
                              <TableHead>Allowed Sweep Category</TableHead>
                              <TableHead>Allowed Currency</TableHead>
                              <TableHead>Structure Type</TableHead>
                              <TableHead>Allowed Sweep Type</TableHead>
                              <TableHead>Status</TableHead>
                              <TableHead>Maker</TableHead>
                              <TableHead>Maker Date Time</TableHead>
                              <TableHead>Checker</TableHead>
                              <TableHead>Checker Date Time</TableHead>
                              <TableHead className="text-right">Action</TableHead>
                            </TableRow>
                          </TableHeader>
                          <TableBody>
                            {authorizedRecords.map((record) => (
                              <TableRow key={record.id}>
                                <TableCell>
                                  <Checkbox />
                                </TableCell>
                                <TableCell className="font-medium">{record.allowedSweepCategory.join(", ")}</TableCell>
                                <TableCell>{record.allowedCurrencies.join(", ")}</TableCell>
                                <TableCell>{record.structureType.join(", ")}</TableCell>
                                <TableCell>{record.allowedSweepType.join(", ")}</TableCell>
                                <TableCell>
                                  <span className="inline-flex items-center rounded-full bg-green-50 px-2 py-1 text-xs font-medium text-green-700 ring-1 ring-inset ring-green-600/20">
                                    {record.action}
                                  </span>
                                </TableCell>
                                <TableCell>{record.maker}</TableCell>
                                <TableCell className="text-sm text-muted-foreground">{record.makerDateTime}</TableCell>
                                <TableCell>{record.checker}</TableCell>
                                <TableCell className="text-sm text-muted-foreground">
                                  {record.checkerDateTime}
                                </TableCell>
                                <TableCell className="text-right">
                                  <div className="flex justify-end gap-2">
                                    <Button variant="ghost" size="icon" className="h-8 w-8">
                                      <Eye className="h-4 w-4" />
                                    </Button>
                                    <Button variant="ghost" size="icon" className="h-8 w-8">
                                      <Edit className="h-4 w-4" />
                                    </Button>
                                    <Button variant="ghost" size="icon" className="h-8 w-8 text-destructive">
                                      <Trash2 className="h-4 w-4" />
                                    </Button>
                                  </div>
                                </TableCell>
                              </TableRow>
                            ))}
                          </TableBody>
                        </Table>
                      </div>

                      <div className="flex items-center justify-between mt-4">
                        <p className="text-sm text-muted-foreground">
                          Showing 1 to {authorizedRecords.length} of {authorizedRecords.length} entries
                        </p>
                      </div>
                    </>
                  )}
                </TabsContent>

                <TabsContent value="rejected" className="mt-0">
                  {rejectedRecords.length === 0 ? (
                    <div className="py-12 text-center text-muted-foreground">No rejected records found.</div>
                  ) : (
                    <div className="border rounded-lg">
                      <Table>
                        <TableHeader>
                          <TableRow>
                            <TableHead>Allowed Sweep Category</TableHead>
                            <TableHead>Reject Reason</TableHead>
                            <TableHead>Maker</TableHead>
                            <TableHead>Checker</TableHead>
                            <TableHead>Checker Date Time</TableHead>
                          </TableRow>
                        </TableHeader>
                        <TableBody>
                          {rejectedRecords.map((record) => (
                            <TableRow key={record.id}>
                              <TableCell className="font-medium">{record.allowedSweepCategory.join(", ")}</TableCell>
                              <TableCell className="text-destructive">{record.rejectReason}</TableCell>
                              <TableCell>{record.maker}</TableCell>
                              <TableCell>{record.checker}</TableCell>
                              <TableCell className="text-sm text-muted-foreground">{record.checkerDateTime}</TableCell>
                            </TableRow>
                          ))}
                        </TableBody>
                      </Table>
                    </div>
                  )}
                </TabsContent>

                <TabsContent value="disabled" className="mt-0">
                  {disabledRecords.length === 0 ? (
                    <div className="py-12 text-center text-muted-foreground">No disabled records found.</div>
                  ) : (
                    <div className="py-12 text-center text-muted-foreground">
                      Disabled records functionality coming soon
                    </div>
                  )}
                </TabsContent>
              </div>
            </Tabs>
          </div>
        </div>
      </main>

      <Dialog open={rejectDialogOpen} onOpenChange={setRejectDialogOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Reject Record</DialogTitle>
            <DialogDescription>Please provide a reason for rejecting this record.</DialogDescription>
          </DialogHeader>
          <div className="py-4">
            <Textarea
              placeholder="Enter reject reason..."
              value={rejectReason}
              onChange={(e) => setRejectReason(e.target.value)}
              rows={4}
              className="w-full"
            />
          </div>
          <DialogFooter>
            <Button variant="outline" onClick={() => setRejectDialogOpen(false)}>
              Cancel
            </Button>
            <Button variant="destructive" onClick={handleRejectConfirm}>
              Confirm Reject
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      <DashboardFooter />
    </div>
  )
}
