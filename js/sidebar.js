function openNav() {
    const sidebar = get.Id("mySidebar")
    sidebar.classList.add("sidebarOpen")
    setTimeout( () => {
        sidebar.style.transitionDuration = "0s";
        sidebar.classList.add("sidebarShadow");
    }, 450)
}

function closeNav() {
    const sidebar = get.Id("mySidebar")
    sidebar.style.transitionDuration = ".5s";
    sidebar.classList.remove("sidebarShadow");
    sidebar.classList.remove("sidebarOpen");
}