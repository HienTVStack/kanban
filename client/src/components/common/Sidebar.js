import { useDispatch, useSelector } from "react-redux";
import { useNavigate, useParams, Link } from "react-router-dom";
import {
    Drawer,
    List,
    Box,
    Typography,
    ListItem,
    IconButton,
    ListItemButton,
} from "@mui/material";
import LogoutIcon from "@mui/icons-material/Logout";
import AddBoxOutlinedIcon from "@mui/icons-material/AddBoxOutlined";
import { useEffect, useState } from "react";
import { DragDropContext, Draggable, Droppable } from "react-beautiful-dnd";

import assets from "../../assets";
import boardApi from "../../api/boardApi";
import { setBoards } from "../../redux/features/boardSlice";

function Sidebar() {
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const boardId = useParams();
    const user = useSelector((state) => state.user.value);
    const boards = useSelector((state) => state.board.value);
    const [activeIndex, setActiveIndex] = useState(0);
    const sidebarWidth = 250;

    useEffect(() => {
        const getBoards = async () => {
            try {
                const res = await boardApi.getAll();
                dispatch(setBoards(res));
            } catch (err) {
                alert(err);
            }
        };
        getBoards();
    }, [dispatch]);

    useEffect(() => {
        const activeItem = boards.findIndex((e) => e._id === boardId);
        if (boards.length > 0 && boardId === undefined) {
            navigate(`/boards/${boards[0]._id}`);
        }
        setActiveIndex(activeItem);
    }, [boards, boardId, navigate]);

    const onDragEnd = async ({ source, destination }) => {
        const newList = [...boards];
        const [removed] = newList.splice(source.index, 1);
        newList.splice(destination.index, 0, removed);

        const activeItem = newList.findIndex((e) => e.id === boardId);
        setActiveIndex(activeItem);
        dispatch(setBoards(newList));

        try {
            await boardApi.updatePosition({ boards: newList });
        } catch (err) {
            alert(err);
        }
    };
    const handleLogout = () => {
        localStorage.removeItem("token");
        navigate("/login");
    };

    const addBoard = async () => {
        try {
            const res = await boardApi.create();
            const newList = [res, ...boards];
            dispatch(setBoards(newList));
            navigate(`/boards/${res._id}`);
        } catch (error) {
            alert(error);
        }
    };
    return (
        <Drawer
            container={window.document.body}
            variant="permanent"
            open={true}
            sx={{
                width: sidebarWidth,
                height: "100vh",
                "& > div": { borderRight: "none" },
            }}
        >
            <List
                disablePadding
                sx={{
                    width: sidebarWidth,
                    height: "100vh",
                    backgroundColor: assets.colors.secondary,
                }}
            >
                <ListItem>
                    <Box
                        sx={{
                            width: "100%",
                            display: "flex",
                            alignItems: "center",
                            justifyContent: "space-between",
                        }}
                    >
                        <Typography
                            component={Link}
                            to="/"
                            variant="body2"
                            fontWeight="700"
                            sx={{
                                textDecoration: "none",
                                color: "#fff",
                            }}
                        >
                            {user.username}
                        </Typography>
                        <IconButton onClick={handleLogout}>
                            <LogoutIcon fontSize="small" />
                        </IconButton>
                    </Box>
                </ListItem>
                <Box sx={{ paddingTop: "10px" }} />
                {/* <FavouriteList /> */}
                <Box sx={{ paddingTop: "10px" }} />
                <ListItem>
                    <Box
                        sx={{
                            width: "100%",
                            display: "flex",
                            alignItems: "center",
                            justifyContent: "space-between",
                        }}
                    >
                        <Typography variant="body2" fontWeight="700">
                            Private
                        </Typography>
                        <IconButton onClick={addBoard}>
                            <AddBoxOutlinedIcon fontSize="small" />
                        </IconButton>
                    </Box>
                </ListItem>
                <DragDropContext onDragEnd={onDragEnd}>
                    <Droppable
                        key={"list-board-droppable-key"}
                        droppableId={"list-board-droppable"}
                    >
                        {(provided) => (
                            <div
                                ref={provided.innerRef}
                                {...provided.droppableProps}
                            >
                                {boards.map((item, index) => (
                                    <Draggable
                                        key={item._id}
                                        draggableId={item._id}
                                        index={index}
                                    >
                                        {(provided, snapshot) => (
                                            <ListItemButton
                                                ref={provided.innerRef}
                                                {...provided.dragHandleProps}
                                                {...provided.draggableProps}
                                                selected={index === activeIndex}
                                                component={Link}
                                                to={`/boards/${item._id}`}
                                                sx={{
                                                    pl: "20px",
                                                    cursor: snapshot.isDragging
                                                        ? "grab"
                                                        : "pointer!important",
                                                }}
                                            >
                                                <Typography
                                                    variant="body2"
                                                    fontWeight="700"
                                                    sx={{
                                                        whiteSpace: "nowrap",
                                                        overflow: "hidden",
                                                        textOverflow:
                                                            "ellipsis",
                                                    }}
                                                >
                                                    {item.icon} {item.title}
                                                </Typography>
                                            </ListItemButton>
                                        )}
                                    </Draggable>
                                ))}
                                {provided.placeholder}
                            </div>
                        )}
                    </Droppable>
                </DragDropContext>
            </List>
        </Drawer>
    );
}

export default Sidebar;
