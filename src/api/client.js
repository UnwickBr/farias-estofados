export const apiClient = {
  auth: {
    async me() {
      return null
    },
    logout() {},
    redirectToLogin() {},
  },
  entities: {
    Product: {
      async filter() {
        return []
      },
    },
  },
}
