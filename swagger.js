const User = require('./models/userModel')
const Todo = require('./models/todoModel')
/**
 * @swagger
 * /api/v1/users:
 *   get:
 *     summary: Retrieve a list of users
 *     responses:
 *       200:
 *         description: A list of users.
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/User'
 * components:
 *   schemas:
 *     User:
 *       type: object
 *       required:
 *         - name
 *         - email
 *         - phoneNumber
 *         - password
 *       properties:
 *         name:
 *           type: string
 *           description: The user's name.
 *         email:
 *           type: string
 *           description: The user's email.
 *         phoneNumber:
 *           type: string
 *           description: The user's phone number.
 *         password:
 *           type: string
 *           description: The user's password.
 *       example:
 *         name: Leanne Graham
 *         email: Sincere@april.biz
 *         phoneNumber: 9012345678
 *         password: myStrongPassword
 */
app.get('/api/v1/users', async (req, res) => {
    const users = await User.find();
    res.send(users);
});

/**
 * @swagger
 * /api/v1/users:
 *   post:
 *     summary: Create a new user
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/User'
 *     responses:
 *       201:
 *         description: The created user.
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/User'
 */
app.post('/api/v1/users', async (req, res) => {
    const newUser = new User(req.body);
    const savedUser = await newUser.save();
    res.send(savedUser);
});

/**
 * @swagger
 * /api/v1/users/{userId}:
 *   get:
 *     summary: Retrieve a specific user
 *     parameters:
 *       - in: path
 *         _id: id
 *         required: true
 *         schema:
 *           type: string
 *         description: The user ID.
 *     responses:
 *       200:
 *         description: The user.
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/User'
 */
app.get('/api/v1/users/:userId', async (req, res) => {
    const user = await User.findById(req.params.id);
    res.send(user);
});

/**
 * @swagger
 * /api/v1/users:
 *   patch:
 *     summary: Update a specific user
 *     parameters:
 *       - in: path
 *         _id: id
 *         required: true
 *         schema:
 *           type: string
 *         description: The user ID.
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/User'
 *     responses:
 *       200:
 *         description: The updated user.
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/User'
 */
app.patch('/api/v1/users', async (req, res) => {
    let user = await User.findById(req.user._id);
    user.name = req.body.name || user.name;
    user.email = req.body.email || user.email;
    user.phoneNumber = req.body.phoneNumber || user.phoneNumber;
    await user.save();
    res.send(user);
});


/**
 * @swagger
 * /api/v1/users:
 *   delete:
 *     summary: Delete a specific user
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: The user ID.
 *     responses:
 *       204:
 *         description: The deleted user.
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/User'
 */
app.delete('/api/v1/users/:id', async (req, res) => {
    const user = await User.deleteOne({ _id: req.user._id });
    res.send(user);
});

/**
 * @swagger
 * /api/v1/todos:
 *   get:
 *     summary: Retrieve a list of todos for logged in user
 *     responses:
 *       200:
 *         description: A list of todos.
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/Todo'
 * components:
 *   schemas:
 *     Todo:
 *       type: object
 *       required:
 *         - text
 *         - completed
 *         - user
 *         - userId
 *       properties:
 *         text:
 *           type: string
 *           description: Task description.
 *         completed:
 *           type: boolean
 *           description: Task is completed or not.
 *         user:
 *           type: object
 *           description: The user who owns this task.
 *         userId:
 *           type: string
 *           description: The user's id.
 *       example:
 *         name: Bring Groceries
 *         completed: flase
 */
app.get('/api/v1/todos', async (req, res) => {
    const users = await Todo.find();
    res.send(users);
});

/**
 * @swagger
 * /api/v1/todos:
 *   post:
 *     summary: Create a new todo
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/Todo'
 *     responses:
 *       201:
 *         description: The created Todo.
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Todo'
 */
app.post('/api/v1/todos', async (req, res) => {
    const newTodo = new Todo(req.body);
    const savedTodo = await newTodo.save();
    res.send(savedTodo);
});

/**
 * @swagger
 * /api/v1/todos/{todoId}:
 *   get:
 *     summary: Retrieve a specific todo
 *     parameters:
 *       - in: path
 *         _id: id
 *         required: true
 *         schema:
 *           type: string
 *         description: The todo ID.
 *     responses:
 *       200:
 *         description: The todo.
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Todo'
 */
app.get('/api/v1/todos/:todoId', async (req, res) => {
    const todo = await Todo.findById(req.params.id);
    res.send(todo);
});




/**
 * @swagger
 * /api/v1/todos/{todoId}:
 *   patch:
 *     summary: Update a specific todo
 *     parameters:
 *       - in: path
 *         _id: id
 *         required: true
 *         schema:
 *           type: string
 *         description: The todo ID.
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/Todo'
 *     responses:
 *       200:
 *         description: The updated user.
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Todo'
 */
app.patch('/api/v1/todos/:todoId', async (req, res) => {
    let todo = await Todo.findById(req.params.todoId);
    todo.text = req.body.text || todo.text;
    todo.completed = req.body.completed || todo.completed;
    await todo.save();
    res.send(todo);
});


/**
 * @swagger
 * /api/v1/todos/{todoId}:
 *   delete:
 *     summary: Delete a specific todo
 *     parameters:
 *       - in: path
 *         _id: id
 *         required: true
 *         schema:
 *           type: string
 *         description: The todo ID.
 *     responses:
 *       204:
 *         description: The deleted todo.
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Todo'
 */
app.delete('/api/v1/todos/:todoId', async (req, res) => {
    const todo = await Todo.deleteOne({ _id: req.params.todoId });
    res.send(todo);
});
