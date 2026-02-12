import React from "react";
import Category from "./Category";
import { Block, BlockHeader } from "./UI";

export default function RoutineBlock({ title, block, state, toggle, locked, dateKey }) {
    if (!block) return null;

    return (
        <Block>
            <BlockHeader>
                {title} — {block.time}
            </BlockHeader>

            <Category
                block={title}
                name="Teeth"
                tasks={block.teeth}
                state={state}
                toggle={toggle}
                locked={locked}
                dateKey={dateKey}
            />

            <Category
                block={title}
                name="Hair"
                tasks={block.hair}
                state={state}
                toggle={toggle}
                locked={locked}
                dateKey={dateKey}
            />

            <Category
                block={title}
                name="Skin"
                tasks={block.skin}
                state={state}
                toggle={toggle}
                locked={locked}
                dateKey={dateKey}
            />

            {block.chores && (
                <Category
                    block={title}
                    name="Chores"
                    tasks={block.chores}
                    state={state}
                    toggle={toggle}
                    locked={locked}
                    dateKey={dateKey}
                />
            )}
        </Block>
    );
}
