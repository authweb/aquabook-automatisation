const routes = [
    { path: '/' },
    { path: 'login' },
    { path: 'register' },
    {
        path: 'booking', children: [
            {
                path: 'profile', children: [
                    { path: 'login' },
                ]
            },
        ]
    },
    {
        path: 'dashboard', children: [
            { path: '/' },
            { path: 'appointments/:eventId' },
            {
                path: 'employees', children: [
                    { path: ':id' },
                    { path: ':id/edit' },
                ]
            },
            { path: 'clients' },
            { path: 'calendar' },
            { path: 'analytics' },
            {
                path: 'services', children: [
                    { path: ':id' },
                    { path: 'add' },
                ]
            },
            {
                path: 'settings', children: [
                    { path: 'company' },
                    {
                        path: 'services', children: [
                            { path: ':id' },
                            { path: 'add' },
                        ]
                    },
                ]
            },
            {
                path: 'users/:id', children: [
                    { path: 'edit' },
                ]
            },
        ]
    },
];

module.exports = routes;
