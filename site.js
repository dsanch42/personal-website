(function () {
  const THEME_KEY = "professional_site_theme";

  const themeToggle = document.getElementById("theme-toggle");
  const themeLabel = document.getElementById("theme-label");

  function applyTheme(theme) {
    var useLight = theme === "light";
    document.body.classList.toggle("light-theme", useLight);
    if (themeLabel) {
      themeLabel.textContent = useLight ? "Switch to Dark Theme" : "Switch to Light Theme";
    }
    localStorage.setItem(THEME_KEY, useLight ? "light" : "dark");
  }

  if (themeToggle) {
    themeToggle.addEventListener("click", function () {
      var nextTheme = document.body.classList.contains("light-theme") ? "dark" : "light";
      applyTheme(nextTheme);
    });
  }

  var savedTheme = localStorage.getItem(THEME_KEY) === "light" ? "light" : "dark";
  applyTheme(savedTheme);

  var revealEls = document.querySelectorAll(".reveal");
  if ("IntersectionObserver" in window) {
    var observer = new IntersectionObserver(function (entries) {
      entries.forEach(function (entry) {
        if (entry.isIntersecting) {
          entry.target.classList.add("visible");
          observer.unobserve(entry.target);
        }
      });
    }, { threshold: 0.1 });
    revealEls.forEach(function (el) { observer.observe(el); });
  } else {
    revealEls.forEach(function (el) { el.classList.add("visible"); });
  }

  var yearGroups = document.querySelectorAll("#accomplishments .year-group");
  yearGroups.forEach(function (group) {
    group.addEventListener("toggle", function () {
      if (!group.open) {
        return;
      }
      yearGroups.forEach(function (otherGroup) {
        if (otherGroup !== group && otherGroup.open) {
          otherGroup.open = false;
        }
      });
    });
  });

  var companyGroups = document.querySelectorAll("#accomplishments .company-group");

  function setCompanyState(group, isExpanded) {
    var content = group.querySelector(":scope > .year-groups");
    var heading = group.querySelector(":scope > .company-heading");
    if (!content || !heading) {
      return;
    }
    content.hidden = !isExpanded;
    group.classList.toggle("expanded", isExpanded);
    heading.setAttribute("aria-expanded", isExpanded ? "true" : "false");
  }

  companyGroups.forEach(function (group) {
    var content = group.querySelector(":scope > .year-groups");
    var heading = group.querySelector(":scope > .company-heading");
    if (!content || !heading) {
      return;
    }

    heading.setAttribute("role", "button");
    heading.setAttribute("tabindex", "0");
    setCompanyState(group, false);

    function onActivate() {
      var willExpand = !group.classList.contains("expanded");
      companyGroups.forEach(function (otherGroup) {
        if (otherGroup !== group) {
          setCompanyState(otherGroup, false);
        }
      });
      setCompanyState(group, willExpand);
    }

    heading.addEventListener("click", onActivate);
    heading.addEventListener("keydown", function (event) {
      if (event.key === "Enter" || event.key === " ") {
        event.preventDefault();
        onActivate();
      }
    });
  });
})();
