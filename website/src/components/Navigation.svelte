<script>
  import { onMount } from "svelte";

  let mobileMenuOpen = false;
  let starCount = "100+";
  let downloadCount = "100+";

  onMount(async () => {
    try {
      const res = await fetch("https://api.github.com/repos/Mazafard/wa-plus");
      const data = await res.json();
      if (data.stargazers_count !== undefined) {
        if (data.stargazers_count < 100) {
          starCount = "100+";
        } else {
          starCount = new Intl.NumberFormat('en-US').format(data.stargazers_count);
        }
      }
    } catch (e) {
      console.error("Failed to fetch star count");
    }

    try {
      const chromeRes = await fetch("https://img.shields.io/chrome-web-store/users/fkhdjggogknhlhaopaameedhchhoomhm.json");
      const chromeData = await chromeRes.json();
      if (chromeData.value && chromeData.value !== "not found") {
        let rawStr = chromeData.value.toString();
        let isLarge = rawStr.includes('k') || rawStr.includes('M') || rawStr.includes('+');
        let num = parseInt(rawStr.replace(/[^0-9]/g, ''));
        
        if (isLarge || (num && num >= 100)) {
          downloadCount = rawStr;
        } else {
          downloadCount = "100+";
        }
      }
    } catch (e) {
      console.error("Failed to fetch chrome users count");
    }
  });

  function toggleMobileMenu() {
    mobileMenuOpen = !mobileMenuOpen;
  }

  function scrollToSection(event, targetId) {
    const isHomePage = window.location.pathname === "/wa-plus/" || window.location.pathname === "/wa-plus" || window.location.pathname === "/";
    if (!isHomePage) {
      return; // Allow standard navigation if on a subpage
    }
    event.preventDefault();
    const target = document.getElementById(targetId);
    if (!target) return;

    if (history.pushState) {
      history.pushState(null, null, "#" + targetId);
    } else {
      location.hash = "#" + targetId;
    }

    const oldPosition = target.style.position;
    target.style.position = "static";
    const targetPosition =
      target.getBoundingClientRect().top + window.pageYOffset;
    target.style.position = oldPosition;

    const startPosition = window.pageYOffset;
    const distance = targetPosition - startPosition;
    let startTime = null;
    const duration = 800;

    function animation(currentTime) {
      if (startTime === null) startTime = currentTime;
      let timeElapsed = currentTime - startTime;
      if (timeElapsed > duration) timeElapsed = duration;

      // easeInOutQuad
      let t = timeElapsed / (duration / 2);
      let run;
      if (t < 1) {
        run = (distance / 2) * t * t + startPosition;
      } else {
        t--;
        run = (-distance / 2) * (t * (t - 2) - 1) + startPosition;
      }

      window.scrollTo(0, run);

      if (timeElapsed < duration) {
        requestAnimationFrame(animation);
      }
    }

    requestAnimationFrame(animation);

    if (mobileMenuOpen) {
      mobileMenuOpen = false;
    }
  }
</script>

<div
  class={`fixed top-0 left-0 w-screen h-screen bg-zinc-950/98 backdrop-blur-md z-[999] flex flex-col items-center justify-center gap-10 transition-transform duration-500 ease-[cubic-bezier(0.68,-0.55,0.265,1.55)] ${mobileMenuOpen ? "translate-y-0 opacity-100 pointer-events-auto" : "-translate-y-full opacity-0 pointer-events-none"}`}
>
  <button
    class="absolute top-6 right-6 bg-transparent border-none text-text-main cursor-pointer p-2"
    on:click={toggleMobileMenu}
    aria-label="Close mobile menu"
  >
    <svg
      width="32"
      height="32"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      stroke-width="2"
      stroke-linecap="round"
      stroke-linejoin="round"
      ><line x1="18" y1="6" x2="6" y2="18"></line><line
        x1="6"
        y1="6"
        x2="18"
        y2="18"
      ></line></svg
    >
  </button>
  <a
    href="/wa-plus/#hero"
    class="text-text-main no-underline text-2xl font-semibold font-outfit"
    on:click={(e) => scrollToSection(e, "hero")}>Home</a
  >
  <a
    href="/wa-plus/#features"
    class="text-text-main no-underline text-2xl font-semibold font-outfit"
    on:click={(e) => scrollToSection(e, "features")}>Features</a
  >
  <a
    href="/wa-plus/#how-it-works"
    class="text-text-main no-underline text-2xl font-semibold font-outfit"
    on:click={(e) => scrollToSection(e, "how-it-works")}>How it Works</a
  >
  <a
    href="/wa-plus/#faq"
    class="text-text-main no-underline text-2xl font-semibold font-outfit"
    on:click={(e) => scrollToSection(e, "faq")}>FAQ</a
  >
  <a
    href="/wa-plus/#download"
    class="text-text-main no-underline text-2xl font-semibold font-outfit"
    on:click={(e) => scrollToSection(e, "download")}>Download</a
  >
  <a
    href="https://chromewebstore.google.com/detail/wa+/fkhdjggogknhlhaopaameedhchhoomhm"
    target="_blank"
    class="flex items-center group no-underline text-text-main"
  >
    <div class="flex items-center gap-2 bg-surface border border-border-subtle py-3 px-5 rounded-l-lg hover:bg-zinc-800/80 transition-colors">
      <svg class="w-5 h-5 text-text-muted group-hover:text-emerald-400 transition-colors" fill="none" stroke="currentColor" viewBox="0 0 24 24" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"/><polyline points="7 10 12 15 17 10"/><line x1="12" y1="15" x2="12" y2="3"/></svg>
      <span class="text-lg font-semibold">Users</span>
    </div>
    <div class="bg-zinc-900 border border-l-0 border-border-subtle py-3 px-4 rounded-r-lg text-lg font-semibold relative before:content-[''] before:absolute before:left-[-5px] before:top-1/2 before:-translate-y-1/2 before:border-y-[5px] before:border-y-transparent before:border-r-[5px] before:border-r-border-subtle after:content-[''] after:absolute after:left-[-4px] after:top-1/2 after:-translate-y-1/2 after:border-y-[4px] after:border-y-transparent after:border-r-[4px] after:border-r-zinc-900">
      {downloadCount}
    </div>
  </a>

  <a
    href="https://github.com/Mazafard/wa-plus"
    target="_blank"
    class="flex items-center group no-underline text-text-main"
  >
    <div class="flex items-center gap-2 bg-surface border border-border-subtle py-3 px-5 rounded-l-lg hover:bg-zinc-800/80 transition-colors">
      <svg class="w-5 h-5 text-text-muted group-hover:text-amber-400 transition-colors" fill="currentColor" viewBox="0 0 24 24"><path d="M12 17.27L18.18 21l-1.64-7.03L22 9.24l-7.19-.61L12 2 9.19 8.63 2 9.24l5.46 4.73L5.82 21z"/></svg>
      <span class="text-lg font-semibold">Star</span>
    </div>
    <div class="bg-zinc-900 border border-l-0 border-border-subtle py-3 px-4 rounded-r-lg text-lg font-semibold relative before:content-[''] before:absolute before:left-[-5px] before:top-1/2 before:-translate-y-1/2 before:border-y-[5px] before:border-y-transparent before:border-r-[5px] before:border-r-border-subtle after:content-[''] after:absolute after:left-[-4px] after:top-1/2 after:-translate-y-1/2 after:border-y-[4px] after:border-y-transparent after:border-r-[4px] after:border-r-zinc-900">
      {starCount}
    </div>
  </a>
  <div class="mt-5">
    <iframe
      src="https://github.com/sponsors/Mazafard/button"
      title="Sponsor Mazafard"
      height="32"
      width="114"
      style="border: 0; border-radius: 6px;"
    ></iframe>
  </div>
</div>

<nav
  class="sticky top-0 z-[100] px-6 py-4 mx-auto mt-5 max-w-[1152px] flex justify-between items-center bg-zinc-950/70 backdrop-blur-md border border-white/10 rounded-2xl shadow-[0_4px_30px_rgba(0,0,0,0.3)]"
>
  <a
    href="/wa-plus/#hero"
    class="logo text-2xl font-extrabold text-text-main no-underline flex items-center gap-3 tracking-tight"
    on:click={(e) => scrollToSection(e, "hero")}
  >
    <div
      class="bg-gradient-to-br from-primary to-emerald-400 text-white w-9 h-9 rounded-lg flex items-center justify-center text-lg font-outfit shadow-[0_4px_12px_rgba(16,185,129,0.3)]"
    >
      WA
    </div>
    WA+
  </a>

  <div class="hidden md:flex gap-8 items-center">
    <a
      href="/wa-plus/#features"
      class="text-text-muted no-underline text-[15px] font-medium transition-colors duration-200 hover:text-text-main"
      on:click={(e) => scrollToSection(e, "features")}>Features</a
    >
    <a
      href="/wa-plus/#how-it-works"
      class="text-text-muted no-underline text-[15px] font-medium transition-colors duration-200 hover:text-text-main"
      on:click={(e) => scrollToSection(e, "how-it-works")}>How it Works</a
    >
    <a
      href="/wa-plus/#faq"
      class="text-text-muted no-underline text-[15px] font-medium transition-colors duration-200 hover:text-text-main"
      on:click={(e) => scrollToSection(e, "faq")}>FAQ</a
    >
    <a
      href="/wa-plus/#download"
      class="text-text-muted no-underline text-[15px] font-medium transition-colors duration-200 hover:text-text-main"
      on:click={(e) => scrollToSection(e, "download")}>Download</a
    >
  </div>

  <div class="flex gap-4 items-center hidden md:flex">
    <!-- GitHub Sponsor Button -->
    <iframe
      src="https://github.com/sponsors/Mazafard/button"
      title="Sponsor Mazafard"
      height="32"
      width="114"
      style="border: 0; border-radius: 6px;"
    ></iframe>

    <!-- Custom Chrome Store Users Button -->
    <a
      href="https://chromewebstore.google.com/detail/wa+/fkhdjggogknhlhaopaameedhchhoomhm"
      target="_blank"
      class="flex items-center group no-underline text-text-main hover:scale-[1.02] transition-transform"
    >
      <div class="flex items-center gap-2 bg-surface border border-border-subtle py-[6px] px-3 rounded-l-md hover:bg-zinc-800/80 transition-colors">
        <svg class="w-4 h-4 text-text-muted group-hover:text-emerald-400 transition-colors" fill="none" stroke="currentColor" viewBox="0 0 24 24" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"/><polyline points="7 10 12 15 17 10"/><line x1="12" y1="15" x2="12" y2="3"/></svg>
        <span class="text-[13px] font-semibold">Users</span>
      </div>
      <div class="bg-zinc-900 border border-l-0 border-border-subtle py-[6px] px-3 rounded-r-md text-[13px] font-semibold relative before:content-[''] before:absolute before:left-[-5px] before:top-1/2 before:-translate-y-1/2 before:border-y-[5px] before:border-y-transparent before:border-r-[5px] before:border-r-border-subtle after:content-[''] after:absolute after:left-[-4px] after:top-1/2 after:-translate-y-1/2 after:border-y-[4px] after:border-y-transparent after:border-r-[4px] after:border-r-zinc-900">
        {downloadCount}
      </div>
    </a>

    <!-- Custom GitHub Star Button -->
    <a
      href="https://github.com/Mazafard/wa-plus"
      target="_blank"
      class="flex items-center group no-underline text-text-main hover:scale-[1.02] transition-transform"
    >
      <div class="flex items-center gap-2 bg-surface border border-border-subtle py-[6px] px-3 rounded-l-md hover:bg-zinc-800/80 transition-colors">
        <svg class="w-4 h-4 text-text-muted group-hover:text-amber-400 transition-colors" fill="currentColor" viewBox="0 0 24 24"><path d="M12 17.27L18.18 21l-1.64-7.03L22 9.24l-7.19-.61L12 2 9.19 8.63 2 9.24l5.46 4.73L5.82 21z"/></svg>
        <span class="text-[13px] font-semibold">Star</span>
      </div>
      <div class="bg-zinc-900 border border-l-0 border-border-subtle py-[6px] px-3 rounded-r-md text-[13px] font-semibold relative before:content-[''] before:absolute before:left-[-5px] before:top-1/2 before:-translate-y-1/2 before:border-y-[5px] before:border-y-transparent before:border-r-[5px] before:border-r-border-subtle after:content-[''] after:absolute after:left-[-4px] after:top-1/2 after:-translate-y-1/2 after:border-y-[4px] after:border-y-transparent after:border-r-[4px] after:border-r-zinc-900">
        {starCount}
      </div>
    </a>
  </div>

  <button
    class="md:hidden bg-transparent border-none text-text-main cursor-pointer p-2"
    on:click={toggleMobileMenu}
    aria-label="Open mobile menu"
  >
    <svg
      width="28"
      height="28"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      stroke-width="2"
      stroke-linecap="round"
      stroke-linejoin="round"
      ><line x1="3" y1="12" x2="21" y2="12"></line><line
        x1="3"
        y1="6"
        x2="21"
        y2="6"
      ></line><line x1="3" y1="18" x2="21" y2="18"></line></svg
    >
  </button>
</nav>
