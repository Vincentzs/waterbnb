export default function authHeader() {
  const access = localStorage.getItem("access"); // Get the "access" item from localStorage
  if (access) {
    return { Authorization: "Bearer " + access };
  } else {
    return {};
  }
}
