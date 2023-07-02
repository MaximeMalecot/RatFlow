import { useState } from "react";
import { Tag } from "../interfaces/tag";
import { copyToClipboard } from "../utils/clipboard";
import TagLineItem from "./tag-line-item";

interface TagListProps {
    tags: Tag[];
    deleteTag: (tagId: string) => void;
}

export default function TagList({ tags, deleteTag }: TagListProps) {
    const [lastCopied, setLastCopied] = useState<string | null>(null);

    const copyTagId =
        (tag: Tag) => (_: React.MouseEvent<SVGSVGElement, MouseEvent>) => {
            navigator.clipboard.writeText(tag._id);
            copyToClipboard({ text: tag._id, label: "Tag id", toast: true });
            setLastCopied(tag._id);
        };

    return (
        <div className="overflow-x-auto">
            <table className="table">
                {/* head */}
                <thead>
                    <tr>
                        <th>Name</th>
                        <th>Id</th>
                        <th title="Average percent of clicks on this tag">
                            Click through rate
                        </th>
                        <th>Created at</th>
                        <th>Actions</th>
                    </tr>
                </thead>
                <tbody>
                    {tags.map((tag, idx) => (
                        <TagLineItem
                            key={idx}
                            tag={tag}
                            deleteTag={deleteTag}
                            copyToClipboard={copyTagId}
                            lastCopied={lastCopied}
                        />
                    ))}
                </tbody>
            </table>
        </div>
    );
}
