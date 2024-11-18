import defaultAxios from "./common";

export const getlist = async() => {
    try {
        const response = await defaultAxios.get("/todolist");
        return response.data;
    }
    catch (error) {
        throw new Error('errorcode:', error);
    }
}

export const postList = async (title) => {
    try {
        const response = await defaultAxios.post("/todolist", {
            title,
            description: false
        });
        return response.data;
    } catch (error) {
        console.error("Error while posting the todo:", error);
        throw new Error(`Error occurred: ${error.message}`);
    }
};
