<script>
  export let number = "1";
  export let title = "";
  export let top = "120px";
  export let zIndex = "10";
  export let isSpecial = false;
</script>

<div
  class="step bg-surface/80 backdrop-blur-xl border border-border-subtle rounded-2xl p-8 shadow-[0_10px_30px_rgba(0,0,0,0.5)] sticky transition-all duration-300 relative ml-6 mt-6"
  style="top: {top}; z-index: {zIndex};"
>
  <div
    class="step-number absolute -top-5 -left-5 bg-zinc-950 min-w-12 h-12 rounded-full border-2 {isSpecial
      ? 'border-amber-500 text-amber-500 shadow-[0_0_15px_rgba(245,158,11,0.2)]'
      : 'border-primary text-primary shadow-[0_0_15px_rgba(16,185,129,0.2)]'} flex items-center justify-center text-xl font-bold font-outfit"
  >
    {number}
  </div>
  <div class="step-content {isSpecial ? 'border-amber-500/30' : ''}">
    <h3 class="{isSpecial ? 'text-amber-500' : ''} text-2xl mb-2 font-semibold">
      {title}
    </h3>
    <p class="text-text-muted text-[16px] leading-[1.6] m-0">
      <slot></slot>
    </p>
  </div>
</div>
