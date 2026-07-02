<script>
  import StepCard from "./StepCard.svelte";
  let activeTab = "chrome";

  function switchTab(browser) {
    activeTab = browser;
  }
</script>

<section class="curtain-section z-[3]" id="how-it-works">
  <div
    class="container how-it-works py-[100px] text-center w-full max-w-[1200px]"
  >
    <div class="section-header mb-[60px]">
      <h2 class="text-[48px] mt-24 mb-4 tracking-[-1px]">
        How to extract your first group
      </h2>
      <p class="text-xl text-text-muted">Get started in less than a minute.</p>
    </div>

    <div class="browser-tabs flex justify-center gap-4 mb-10">
      <button
        class="tab-btn bg-surface border border-border-subtle text-text-main py-3 px-8 rounded-full text-[15px] font-semibold cursor-pointer transition-all hover:bg-zinc-800/80 {activeTab ===
        'chrome'
          ? '!bg-white !text-zinc-950 !border-white !shadow-[0_0_20px_rgba(255,255,255,0.2)]'
          : ''}"
        on:click={() => switchTab("chrome")}
        id="btn-chrome">Google Chrome</button
      >
      <button
        class="tab-btn bg-surface border border-border-subtle text-text-main py-3 px-8 rounded-full text-[15px] font-semibold cursor-pointer transition-all hover:bg-zinc-800/80 relative {activeTab ===
        'firefox'
          ? '!bg-white !text-zinc-950 !border-white !shadow-[0_0_20px_rgba(255,255,255,0.2)]'
          : ''}"
        on:click={() => switchTab("firefox")}
        id="btn-firefox"
      >
        Mozilla Firefox
        <span
          class="absolute -top-2 -right-2 bg-gradient-to-br from-amber-500 to-amber-700 text-white text-[11px] py-1 px-[10px] rounded-[12px] font-extrabold shadow-[0_4px_12px_rgba(245,158,11,0.4)] rotate-6"
          >Coming Soon</span
        >
      </button>
    </div>

    <div
      class="steps-container max-w-[800px] mx-auto text-left relative min-h-[400px]"
    >
      {#if activeTab === "chrome"}
        <!-- Chrome Steps -->
        <div
          id="steps-chrome"
          class="steps-list flex flex-col gap-[50vh] pb-[56vh] w-full"
        >
          <StepCard
            number="1"
            title="Install the Extension"
            top="100px"
            zIndex="10"
          >
            Download WA+ from the <a
              href="https://chromewebstore.google.com/detail/wa+/fkhdjggogknhlhaopaameedhchhoomhm"
              target="_blank"
              class="text-primary no-underline font-semibold hover:underline"
              >Chrome Web Store</a
            > and pin it to your browser toolbar for easy access.
          </StepCard>

          <StepCard
            number="2"
            title="Open WhatsApp Web"
            top="140px"
            zIndex="11"
          >
            Navigate to <a
              href="https://web.whatsapp.com"
              target="_blank"
              class="text-primary no-underline font-semibold hover:underline"
              >web.whatsapp.com</a
            > and log in by scanning the QR code with your phone.
          </StepCard>

          <StepCard number="3" title="Open a Group" top="180px" zIndex="12">
            Click on the group chat you want to extract participants from. Then,
            click on the header of the group to open the group info sidebar.
          </StepCard>

          <StepCard
            number="4"
            title="Fetch Participants"
            top="220px"
            zIndex="13"
          >
            Click the WA+ extension icon in your browser toolbar, then click <strong
              class="text-white font-semibold">Extract Participants</strong
            >. You can view all members, copy them in CSV format to your
            clipboard, or click to download the CSV file instantly.
          </StepCard>
        </div>
      {:else}
        <!-- Firefox Steps -->
        <div
          id="steps-firefox"
          class="steps-list flex flex-col gap-[50vh] pb-[56vh] w-full"
        >
          <StepCard
            number="⏳"
            title="Currently under review"
            top="120px"
            zIndex="10"
            isSpecial={true}
          >
            WA+ has been submitted to the Mozilla Add-ons store and is currently
            undergoing its final review. Once approved, the installation steps
            will appear here!
          </StepCard>
        </div>
      {/if}
    </div>
  </div>
</section>
