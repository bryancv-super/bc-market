"use client"

import { useState } from "react"
import { Button } from "@/components/ui/Button"
import { Card } from "@/components/ui/Card"
import { Input } from "@/components/ui/Input"
import { Loader } from "@/components/ui/Loader"
import { Skeleton } from "@/components/ui/Skeleton"
import { Tag } from "@/components/ui/Tag"
import { EmptyState } from "@/components/ui/Empty-state"
import { PackageSearch } from "lucide-react"
import { Modal } from "@/components/ui/Modal"
import { toast } from "sonner"
import { AppHeader } from "@/components/layout/AppHeader";
import { BackButton } from "@/components/navigation/BackButton"


export default function HomePage() {
  const [open, setOpen] = useState(false)

  return (
    <main className="mx-auto flex min-h-screen w-full max-w-screen-sm flex-col gap-8 p-4">
      <AppHeader
        title="BC Market"
        subtitle="Organiza tus compras"
      />

      <AppHeader
      leftSlot={<BackButton fallbackHref="/" />}
      title="My Lists"
      />

      <AppHeader
      leftSlot={<BackButton fallbackHref="/lists" />}
      title="Groceries"
      rightSlot={
        <Button variant="ghost" className="icon">
          Edit
        </Button>
      }
      />      
        
      {/* Header */}
      <section className="space-y-2">
        <h1 className="text-2xl font-bold">
          BC Market UI Foundation
        </h1>

        <p className="text-sm text-muted-foreground">
          Temporary playground for UI components
        </p>
      </section>

      {/* Buttons */}
      <section className="space-y-4">
        <h2 className="text-lg font-semibold">
          Buttons
        </h2>

        <div className="flex flex-wrap gap-3">
          <Button>
            Primary
          </Button>

          <Button variant="secondary">
            Secondary
          </Button>

          <Button variant="destructive">
            Destructive
          </Button>

          <Button disabled>
            Disabled
          </Button>
        </div>
      </section>

      {/* Input */}
      <section className="space-y-4">
        <h2 className="text-lg font-semibold">
          Input
        </h2>

        <Input placeholder="Search products..." />
      </section>

      {/* Tags */}
      <section className="space-y-4">
        <h2 className="text-lg font-semibold">
          Tags
        </h2>

        <div className="flex flex-wrap gap-2">
          <Tag>
            Fruits
          </Tag>

          <Tag variant="active">
            Vegetables
          </Tag>

          <Tag variant="outline">
            Cleaning
          </Tag>

          <Tag size="sm">
            Small
          </Tag>
        </div>
      </section>

      {/* Loader */}
      <section className="space-y-4">
        <h2 className="text-lg font-semibold">
          Loader
        </h2>

        <div className="flex items-center gap-4">
          <Loader size="sm" />

          <Loader size="md" />

          <Loader size="lg" />
        </div>
      </section>

      {/* Skeleton */}
      <section className="space-y-4">
        <h2 className="text-lg font-semibold">
          Skeleton
        </h2>

        <div className="space-y-3">
          <Skeleton className="h-40 w-full rounded-xl" />

          <Skeleton className="h-4 w-3/4" />

          <Skeleton className="h-4 w-1/2" />
        </div>
      </section>

      {/* Card */}
      <section className="space-y-4">
        <h2 className="text-lg font-semibold">
          Card
        </h2>

        <Card className="space-y-3 p-4">
          <h3 className="font-semibold">
            Grocery List
          </h3>

          <p className="text-sm text-muted-foreground">
            Weekly shopping essentials
          </p>

          <div className="flex gap-2">
            <Tag size="sm">
              12 items
            </Tag>

            <Tag size="sm" variant="outline">
              Shared
            </Tag>
          </div>

          <Button className="w-full">
            Open List
          </Button>
        </Card>
      </section>

      {/* Empty State */}
      <section className="space-y-4">
        <h2 className="text-lg font-semibold">
          Empty State
        </h2>

        <EmptyState
          icon={
            <PackageSearch className="h-10 w-10" />
          }
          title="No products found"
          description="Try adjusting your search or filters."
          action={
            <Button>
              Clear Filters
            </Button>
          }
        />
      </section>
        
      {/* Modal */}
      <section className="space-y-4">
        <h2 className="text-lg font-semibold">
          Modal
        </h2>

        <Button onClick={() => setOpen(true)}>
          Open Modal
        </Button>

        <Modal
          open={open}
          onOpenChange={setOpen}
          title="Create New List"
          description="Add a title for your grocery list."
        >
          <div className="space-y-4">
            <Input placeholder="Weekly groceries..." />

            <Button className="w-full">
              Create List
            </Button>
          </div>
        </Modal>
      </section>

      {/* Toast */}
      <section className="space-y-4">
        <h2 className="text-lg font-semibold">
          Toast
        </h2>

        <div className="flex flex-wrap gap-3">
          <Button
            onClick={() =>
              toast.success("List created successfully")
            }
          >
            Success Toast
          </Button>

          <Button
            variant="destructive"
            onClick={() =>
              toast.error("Something went wrong")
            }
          >
            Error Toast
          </Button>
        </div>
      </section>
    </main>
    
  )
}