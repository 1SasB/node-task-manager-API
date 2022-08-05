const mongoose = require('mongoose')

mongoose.connect('mongodb+srv://1stilinski:psalm123@cluster0.ikxqn.mongodb.net/auth-project?retryWrites=true&w=majority',{
    useNewUrlParser: true,
    useCreateIndex: true,
    useUnifiedTopology: true,
    useFindAndModify: false
})



