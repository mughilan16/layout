"use client"
import { Box, IconButton, Typography } from "@mui/material";
import { useFiles } from "@/queries/useFiles";
import { useState } from "react";
import { ArrowDropDown, ArrowRight, FileOpen } from "@mui/icons-material";

export default function Files() {
    const { data: files, isLoading } = useFiles();
    if (isLoading) return <>Loading</>
    if (files === undefined) return <></>
    const trees = buildTree(files.logs.data);
    let i = -1;
    return (
        <Box sx={{ display: "flex", flexDirection: "column", gap: "4rem", padding: "4rem", width: "100vw" }}>
            {trees.map(tree => {
                i++;
                return (
                    <Box sx={{ display: "flex", flexDirection: "column", gap: "1rem" }}>
                        <Box>Process Name: {files.logs.data[i].process_name}</Box>
                        <Box>Job Number: {files.logs.data[i].job_number}</Box>
                        <Box>Status: {files.logs.data[i].status}</Box>
                        <Box>
                            <Box sx={{
                                backgroundColor: "#444", color: "#ddd", p: "0.5rem", paddingX: "2rem",
                                borderTopLeftRadius: "1rem", borderTopRightRadius: "1rem"
                            }}>Files</Box>
                            <Box
                                sx={{
                                    backgroundColor: "#555", color: "#ddd", p: "0.5rem", paddingX: "1rem",
                                    borderBottomLeftRadius: "1rem", borderBottomRightRadius: "1rem"
                                }}
                            >{tree.children.map(folder => <Folder node={folder} />)}</Box>
                        </Box>
                    </Box>
                )
            }
            )}
        </Box>
    );
}

function File(props: { file: Node }) {
    return <Box sx={{ display: "flex", alignItems: "center", p: 0.4, pl: 1 }}>
        <FileOpen />{props.file.name}
    </Box>
}

function Folder(props: { node: Node }) {
    const [toggle, setToggle] = useState(false);
    if (props.node.isFile === true) return <File file={props.node} />
    return <Box sx={{ p: 0.4 }}>
        <Box sx={{ display: "flex", alignItems: "center", flexDirection: "row" }}>
            <IconButton onClick={() => setToggle(prev => !prev)} sx={{ p: 0.4 }}>
                {toggle ? <ArrowDropDown fontSize="medium" /> : <ArrowRight fontSize="medium" />}
            </IconButton>
            <Typography>{props.node.name}</Typography>
        </Box>
        {toggle && props.node.children.length !== 0 &&
            <Box sx={{ ml: 2, borderLeft: "2px solid #666", display: "flex", flexDirection: "column" }}>
                {props.node.children.map(i => <Folder node={i} />)}
            </Box>
        }
    </Box>
}

type Node = {
    name: string,
    children: Array<Node>
    isFile: boolean
}

function buildTree(doc: Array<{
    parent_folder: string,
    files: Array<{
        path: string, size: number
    }>
}>) {
    let trees: Array<Node> = [];
    doc.forEach(data => {
        const tree: Node = { name: "root", children: [], isFile: false };
        console.log(data.parent_folder)
        const path = data.parent_folder.split("/")
        let prev_head = tree;
        path.forEach(file => {
            let already_exist = false;
            let index = 0;
            prev_head.children.forEach(i => {
                if (i.name === file) {
                    already_exist = true;
                } else {
                    index++;
                }
            });
            if (!already_exist) {
                prev_head.children = [...prev_head.children, {
                    name: file, children: [], isFile: false
                }]
            }
            prev_head = prev_head.children[index]
            console.log(prev_head.name, data.parent_folder)
        })
        const parent_head = prev_head;
        data.files.forEach(files => {
            const file_path = files.path.replace(data.parent_folder + "/", "").split("/");
            prev_head = parent_head;
            for (let i = 0; i < file_path.length; i++) {
                if (i === file_path.length - 1) {
                    prev_head.children = [...prev_head.children, {
                        name: file_path[i], children: [], isFile: true
                    }];
                    break;
                }
                let already_exist = false;
                let index = 0;
                prev_head.children.forEach(j => {
                    if (j.name === file_path[i]) {
                        already_exist = true;
                    } else {
                        index++;
                    }
                });
                if (!already_exist) {
                    prev_head.children = [...prev_head.children, {
                        name: file_path[i], children: [], isFile: false
                    }];
                }
            }
        })
        trees = [...trees, tree]
    })
    return trees;
}

