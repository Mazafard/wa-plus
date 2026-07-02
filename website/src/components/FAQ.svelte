<script>
  const faqs = [
    {
      q: "How do I install WA+?",
      a: "Simply visit the <a href='https://chromewebstore.google.com/detail/wa+/fkhdjggogknhlhaopaameedhchhoomhm' target='_blank' class='text-primary hover:underline font-semibold'>Chrome Web Store</a> and click 'Add to Chrome'. The extension will install instantly. Once installed, pin the WA+ icon to your toolbar, open WhatsApp Web, and you're ready to start exporting!"
    },
    {
      q: "Is my data private and secure?",
      a: "Yes! 100% of the data extraction happens locally on your own machine. We do not use external servers, we do not track your activity, and your data is never sent anywhere else."
    },
    {
      q: "Is there a limit on how many participants I can export?",
      a: "No! Because WA+ hooks directly into the WhatsApp Web memory tree instead of slowly scrolling through the UI, it can seamlessly export massive groups with thousands of participants in a fraction of a second."
    },
    {
      q: "Does WA+ work on other browsers?",
      a: "WA+ is currently available for Google Chrome and Chromium-based browsers (like Edge, Brave, and Arc). A native Mozilla Firefox version is currently in development and coming very soon!"
    },
    {
      q: "Can I use WA+ on my mobile phone?",
      a: "WA+ is a desktop browser extension specifically engineered to work alongside WhatsApp Web. It cannot be installed on mobile devices."
    }
  ];

  let openIndex = 0;
</script>

<section class="curtain-section z-[4] bg-bg-color" id="faq">
  <div class="container pt-[100px] pb-[30vh] w-full max-w-[800px] mx-auto px-4 min-h-screen">
    <div class="section-header mb-[60px] text-center">
      <h2 class="text-[48px] mt-24 mb-4 tracking-[-1px]">
        Frequently Asked Questions
      </h2>
      <p class="text-xl text-text-muted">In case you missed something</p>
    </div>

    <div class="flex flex-col gap-4">
      {#each faqs as faq, i}
        <div class="border border-border-subtle rounded-2xl bg-zinc-950/50 backdrop-blur-sm overflow-hidden transition-all duration-300 {openIndex === i ? 'shadow-[0_0_30px_rgba(16,185,129,0.05)] border-primary/30 bg-zinc-900/80' : ''}">
          <button 
            class="w-full text-left px-8 py-6 flex justify-between items-center text-lg font-semibold cursor-pointer text-text-main hover:text-white transition-colors"
            on:click={() => openIndex = openIndex === i ? -1 : i}
          >
            {faq.q}
            <svg 
              class="w-6 h-6 text-text-muted transition-transform duration-300 {openIndex === i ? 'rotate-180 text-primary' : ''}" 
              fill="none" 
              viewBox="0 0 24 24" 
              stroke="currentColor"
            >
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 9l-7 7-7-7" />
            </svg>
          </button>
          
          {#if openIndex === i}
            <div class="px-8 pb-8 pt-2 text-text-muted leading-relaxed text-[16px]">
              {@html faq.a}
            </div>
          {/if}
        </div>
      {/each}
    </div>
  </div>
</section>
