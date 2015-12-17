let security = () => {
    Security.defineMethod("ifIsOwner", {
        fetch: [],
        transform: null,
        deny: function (type, arg, userId, doc) {
            return userId !== doc._id;
        }
    });

    // Only if an admin user is logged in
    Security.permit(['insert', 'update', 'remove']).collections([
        Cialcos, Organizaciones, Redes, Productores, MontosVenta, Metas, Respaldos, Meteor.users
    ]).ifHasRole('admin').apply();

    // Only if a user is logged in
    Security.permit(['insert']).collections([
      Cialcos, Organizaciones, Redes, Productores, MontosVenta, Metas, Respaldos
    ]).ifLoggedIn().apply();

    // Only if a user is logged in and is the owner of the document
    Security.permit(['update', 'remove']).collections([
      Cialcos, Organizaciones, Redes, Productores, MontosVenta, Metas, Respaldos
    ]).ifLoggedIn().ifIsOwner().apply();

    // Only if a user doesn't try to change the roles property and is the owner of the document
    Meteor.users.permit('update').ifLoggedIn().ifIsOwner().exceptProps(['roles']).apply();
};

Modules.server.security = security;
