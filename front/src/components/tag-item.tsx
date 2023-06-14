import { Tag } from "../interfaces/tag";

interface TagItemProps {
    tag: Tag;
}

export default function TagItem({ tag }: TagItemProps) {
    return (
        <div className="flex flex-col">
            <p className="uppercase">{tag.name}</p>
            <button>Copy key</button>
        </div>
    );
}
