const { Role, Permission } = require("../models");

const checkPermission = (permissionSlug) => {
  return async (req, res, next) => {
    const userRoles = await req.user.getRoles(); // Récupère les rôles de l'utilisateur
    for (const role of userRoles) {
      const permissions = await role.getPermissions();
      if (permissions.some((perm) => perm.slug === permissionSlug)) {
        return next();
      }
    }

    return res.status(403).json({ message: "Permission refusée" });
  };
};

module.exports = checkPermission;
