import { useCallback, useEffect, useState } from "react";
import NewTagModal from "../../components/new-tag-modal";
import TagList from "../../components/tag-list";
import GetTagsVariableModal from "../../components/tutorials/get-tags-variable-modal";
import HowToUseTagsModal from "../../components/tutorials/how-to-use-tags-modal";
import { YellowBtn } from "../../components/yellow-btn";
import { useAppContext } from "../../contexts/manage-app.context";
import { Tag } from "../../interfaces/tag";
import tagService from "../../services/tag.service";

export default function Tags() {
    const { app } = useAppContext();
    const [tags, setTags] = useState<Tag[]>([]);
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [showTutorialModal, setShowTutorialModal] = useState(false);
    const [showTagsVariableModal, setShowTagsVariableModal] = useState(false);

    const fetchTags = async () => {
        try {
            const res = await tagService.getTagsOfApp(app._id);
            setTags(res);
        } catch (e: any) {
            console.error(e.message);
        }
    };

    const createTag = useCallback(
        async (name: string) => {
            try {
                const res = await tagService.create(name, app._id);
                setTags((tags) => [...tags, res]);
            } catch (e: any) {
                console.error(e.message);
            }
        },
        [app]
    );

    const deleteTag = useCallback(
        async (tagId: string) => {
            try {
                await tagService.delete(tagId);
                setTags((localTags) =>
                    localTags.filter((tag) => tag._id !== tagId)
                );
            } catch (e: any) {
                console.error(e.message);
            }
        },
        [app]
    );

    useEffect(() => {
        fetchTags();
    }, []);

    return (
        <div className="w-full flex flex-col" style={{ width: "100%" }}>
            <div className="flex flex-col gap-3">
                <div className="flex justify-between">
                    <h2 className="text-2xl">Tags ({tags.length})</h2>
                    <YellowBtn
                        onClick={() => setIsModalOpen(true)}
                        className="w-fit"
                    >
                        Create a tag
                    </YellowBtn>
                </div>
                <p className="text-sm">
                    Tags allow you to track specific element of your front app,
                    such as a button, a form or an input.
                </p>
                <button
                    onClick={() => setShowTutorialModal(true)}
                    className="text-sm text-blue border-b-2 border-b-blue w-fit"
                >
                    How to use it?
                </button>
                <button
                    onClick={() => setShowTagsVariableModal(true)}
                    className="btn btn-primary w-1/5"
                >
                    Get your variables
                </button>
            </div>
            <div className="divider"></div>
            {tags.length === 0 ? (
                <div className="flex flex-col gap-1 my-5">
                    <p className="italic">You have no tag yet</p>
                </div>
            ) : (
                <TagList deleteTag={deleteTag} tags={tags} />
            )}
            <NewTagModal
                isOpen={isModalOpen}
                setIsOpen={setIsModalOpen}
                create={createTag}
            />
            <HowToUseTagsModal
                isOpen={showTutorialModal}
                setIsOpen={setShowTutorialModal}
            />
            <GetTagsVariableModal
                tags={tags}
                isOpen={showTagsVariableModal}
                setIsOpen={setShowTagsVariableModal}
            />
        </div>
    );
}
