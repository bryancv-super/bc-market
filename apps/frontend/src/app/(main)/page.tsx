import { Button } from "@/components/ui/Button";
import { Card } from "@/components/ui/Card";
import { Input } from "@/components/ui/Input";

import { MobileContainer } from "@/components/layout/MobileContainer";
import { PageSection } from "@/components/layout/PageSection";

export default function HomePage() {
  return (
    <MobileContainer>
      <PageSection>
        <Card className="space-y-4">
          <Input placeholder="Search products..." />

          <Button>
            Create List
          </Button>

          <Button variant="secondary">
            Secondary
          </Button>

          <Button variant="destructive">
            Delete
          </Button>
        </Card>
      </PageSection>
    </MobileContainer>
  );
}