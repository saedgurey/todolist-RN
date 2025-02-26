import { Button, StyleSheet, Text, TextInput, View, FlatList, TouchableOpacity } from "react-native";
import { db } from '../firebaseConfigfile';
import { addDoc, collection, deleteDoc, doc, getDocs, updateDoc } from "firebase/firestore";
import { useState, useEffect } from "react";
import Entypo from '@expo/vector-icons/Entypo';
import Ionicons from '@expo/vector-icons/Ionicons';
import { ref } from "firebase/storage";
import AntDesign from '@expo/vector-icons/AntDesign';


export default function Index() {
  const [todo, setTodo] = useState("");
  const [todos, setTodos] = useState([]);
  const [loading, setLoading] = useState(false);

  // Function to fetch todos from Firebase collection
  const fetchTodos = async () => {
    try {
      setLoading(true);
      console.log("Fetching todos...");
      
      // Create a reference to the todos collection
      const todosCollectionRef = collection(db, 'todos');
      
      // Get all documents in the collection
      const querySnapshot = await getDocs(todosCollectionRef);
      
      // Create an array to store the todos
      const todosList = [];
      
      // Add each document to the array
      querySnapshot.forEach((doc) => {
        todosList.push({
          id: doc.id,
          ...doc.data()
        });
      });
      
      setTodos(todosList);
      console.log("Fetched todos:", todosList);
    } catch (error) {
      console.error("Error fetching todos:", error);
    } finally {
      setLoading(false);
    }
  };

  // Fetch todos when component mounts
  useEffect(() => {
    fetchTodos();
  }, []);

  // Function to add a new todo
  const AddTodo = async () => {
    if (!todo.trim()) return;
    
    try {
      const docRef = await addDoc(collection(db, 'todos'), {
        title: todo, 
        done: false
      });

      setTodo(''); // Clear input after successful addition
      console.log("✅ Document written with ID:", docRef.id);
      
      // Refresh the todo list after adding
      fetchTodos();
    } catch (error) {
      console.error("❌ Error adding document:", error);
    }
  };

  // Function to render each todo item
  const renderTodoItem = ({ item }) => {
    const ref = doc(db, `todos/${item.id}`);

   const toggleDone = async () => {
  try {
    await updateDoc(ref, { done: !item.done });

    // Manually update the local state to trigger UI re-render
    setTodos(prevTodos => 
      prevTodos.map(todo => 
        todo.id === item.id ? { ...todo, done: !todo.done } : todo
      )
    );

  } catch (error) {
    console.error("Error updating todo:", error);
  }
};

    

    const DeleteItem = async()=>{
      deleteDoc(ref);
// Update UI by removing the deleted item from state
setTodos(filter(todo => todo.id !== item.id));    }

return(

  <View style={{
   
  }}>
  <TouchableOpacity 
   onPress={toggleDone}
    style={styles.todosContainer}
       >

				{item.done && <Ionicons name="checkmark-circle" size={24} color="green" />}
				{!item.done && <Entypo name="circle" size={32} color="black" /> }
				<Text style={{ padding: 10}}>{item.title}</Text>
			</TouchableOpacity>
      <AntDesign name="delete" size={24} color="black"onPress={DeleteItem} />
  </View>
)
};

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Todo List</Text>
      
      <View style={styles.inputContainer}>
        <TextInput 
          style={styles.input} 
          placeholder="Type todo list" 
          onChangeText={setTodo} 
          value={todo}
        />
        <Button onPress={AddTodo} title="Add Todo" />
      </View>
      
      {loading ? (
        <Text>Loading todos...</Text>
      ) : (
        <View style={styles.todosContainer}>
          <Text style={styles.subtitle}>
            {todos.length > 0 ? "Your Todos:" : "No todos yet!"}
          </Text>
          
          <FlatList
            data={todos}
            keyExtractor={(item) => item.id}
            renderItem={renderTodoItem}
          />
        </View>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    padding: 20,
    flex: 1,
  },
  title: {
    fontSize: 24,
    fontWeight: "bold",
    marginBottom: 20,
    textAlign: "center",
  },
  subtitle: {
    fontSize: 18,
    fontWeight: "bold",
    marginBottom: 10,
  },
  inputContainer: {
    flexDirection: "row",
    marginBottom: 20,
  },
  input: {
    flex: 1,
    borderWidth: 1,
    borderColor: "#ccc",
    padding: 10,
    marginRight: 10,
    borderRadius: 4,
  },
  todosContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: "space-between",
     backgroundColor: 'grey',
     borderRadius: 10   ,
     marginVertical: 4
  },
  todoItem: {
    flexDirection: "row",
    justifyContent: "space-between",
    padding: 15,
    borderBottomWidth: 1,
    borderBottomColor: "#eee",
  },
  todoText: {
    fontSize: 16,
  },
  todoStatus: {
    fontSize: 14,
    color: "#555",
  },
});