// Complete the Index page component here
// Use chakra-ui
import { useState } from "react";
import { Box, Input, Button, List, ListItem, IconButton, Checkbox, Select } from "@chakra-ui/react";
import { FaPlus, FaTrash } from "react-icons/fa";

const Index = () => {
  const [tasks, setTasks] = useState([]);
  const [input, setInput] = useState("");
  const [categories, setCategories] = useState([]);
  const [newCategory, setNewCategory] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("All");

  const handleAddTask = () => {
    if (input.trim() !== "") {
      const newTask = {
        id: Date.now(),
        text: input,
        isCompleted: false,
      };
      setTasks([...tasks, newTask]);
      setInput("");
    }
  };

  const handleDeleteTask = (id) => {
    setTasks(tasks.filter((task) => task.id !== id));
  };

  const handleToggleComplete = (id) => {
    setTasks(
      tasks.map((task) => {
        if (task.id === id) {
          return { ...task, isCompleted: !task.isCompleted };
        }
        return task;
      }),
    );
  };

  return (
    <Box p={5}>
      <Box mb={4} display="flex" flexDirection="column">
        <Box display="flex">
          <Input placeholder="Add a new task" value={input} onChange={(e) => setInput(e.target.value)} onKeyPress={(e) => e.key === "Enter" && handleAddTask()} />
          <Select ml={2} placeholder="Select category" value={selectedCategory} onChange={(e) => setSelectedCategory(e.target.value)}>
            {categories.map((category) => (
              <option key={category} value={category}>
                {category}
              </option>
            ))}
            <option value="All">All</option>
          </Select>
          <Button ml={2} onClick={handleAddTask} leftIcon={<FaPlus />} colorScheme="blue">
            Add
          </Button>
        </Box>
        <Box display="flex" mt={2}>
          <Input placeholder="Add a new category" value={newCategory} onChange={(e) => setNewCategory(e.target.value)} />
          <Button
            ml={2}
            onClick={() => {
              setCategories([...categories, newCategory]);
              setNewCategory("");
            }}
            colorScheme="green"
          >
            Add Category
          </Button>
        </Box>
      </Box>
      <List spacing={3}>
        {tasks
          .filter((task) => selectedCategory === "All" || task.category === selectedCategory)
          .map((task) => (
            <ListItem key={task.id} display="flex" alignItems="center">
              <Checkbox isChecked={task.isCompleted} onChange={() => handleToggleComplete(task.id)} mr={2} />
              <Box flex="1" as="span" textDecoration={task.isCompleted ? "line-through" : "none"}>
                {task.text} - <span style={{ color: "gray" }}>{task.category}</span>
              </Box>
              <IconButton icon={<FaTrash />} onClick={() => handleDeleteTask(task.id)} colorScheme="red" aria-label="Delete task" />
            </ListItem>
          ))}
      </List>
    </Box>
  );
};

export default Index;
