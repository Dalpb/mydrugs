<template>
  <section>
    <h1>Frequently Asked Questions</h1>
    <div class="faq">
      <h2 class="faq-question">
        Is my purchase completely secure through your shop when I make an order?
      </h2>
      <p class="faq-answer">
        Yes, You simply add your purchase to the cart and enter your address at
        the checkout. Your personal data is automatically encrypted using PGP
        and deleted once the order is dispatched. Our team of professionals pack
        your order in a clean-room environment, and ensures smooth and secure
        processing.
      </p>
    </div>
    <div class="faq">
      <h2 class="faq-question">Can I really only pay using cryptocurrency?</h2>
      <p class="faq-answer">
        Yes. We only accept payments in Bitcoin, Ripple, IOTA, and Ethereum. The
        payment procedure is not complicated. You just need to set up a suitable
        wallet. We do not offer Payback or other bonus systems. We weren't born
        yesterday.
      </p>
    </div>
    <div class="faq">
      <h2 class="faq-question">How can I receive my order anonymously?</h2>
      <p class="faq-answer">
        Our shipping team operates around the clock to ensure fast and risk-free
        shipping. Your order will arrive within a few days. Your order can be
        sent to any valid postal address, PO box, or package station. Thanks to
        our highly complex and decentralized system, the transfer to the
        logistics service provider is already anonymous and cannot be traced
        back.
      </p>
    </div>
    <div class="faq">
      <h2 class="faq-question">Is your product safe?</h2>
      <p class="faq-answer">
        Nobody has claimed that doing drugs was safe. However as long as you
        follow the guide in the Safety section there should not be any issues.
        Do not take MDMA if you are also under any perscriptions or doing any
        other drugs. It is also recomended not to take MDMA with any sort of
        alcohol as it might cause irreversable damage to your immune system and
        overall health.
      </p>
    </div>
    <div class="faq">
      <h2 class="faq-question">Is any of this real?</h2>
      <p class="faq-answer">
        Absolutely Not, duh. But could you buy me a coffe,you know ?
      </p>
    </div>
  </section>
</template>
<script lang="ts" setup></script>

<style lang="css" scoped>
section {
  display: flex;
  flex-direction: column;
  gap: 2rem;
  color: white;
  align-items: center;
  margin-top: 1rem;
  padding-bottom: 2rem;
}
.faq {
  width: 50%;
  display: flex;
  flex-direction: column;
  gap: 1rem;
}
.faq-question {
  margin: 0;
  font-size: 2rem;
}
.faq-answer {
  background-color: #ffffff88;
  border-radius: 0.6rem;
  font-size: 1.2rem;
  text-align: justify;
  line-height: 1.7rem;
  padding: 1rem;
}
</style>
