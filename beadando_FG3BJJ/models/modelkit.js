module.exports = {
    identity: 'modelkit',
    connection: 'default',
    attributes: {
        date: {
            type: 'string',
            defaultsTo: function () { return new Date().toDateString(); },
            required: true,
        },
        status: {
            type: 'string',
            enum: ['new', 'inProgress', 'done'],
            required: true,
        },
        make: {
            type: 'string',
            required: true,
        },
        kitname: {
            type: 'string',
            required: true,
        },
        
        user: {
            model: 'user',
        },
    }
}