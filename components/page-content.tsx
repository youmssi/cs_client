import { DynamicZoneManager } from "@/components/dynamic-zone/manager"
import { AmbientColor } from "@/components/decorations/ambient-color";
import { Page } from "@/types";

export const PageContent = ({ pageData }: { pageData: Page }) => {
    const dynamicZone = pageData.blocks;
    return (
        <div className="relative overflow-hidden w-full">
            <AmbientColor />
            {dynamicZone && (
                <DynamicZoneManager
                    blocks={dynamicZone}
                />
            )}
        </div>
    )
}