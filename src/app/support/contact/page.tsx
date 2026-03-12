 "use client";

 import Link from "next/link";
 import Reveal from "@/components/Reveal";

 export default function SupportContactPage() {
   return (
     <main className="min-h-screen bg-warm-white">
       {/* Hero 区：标题 + 简要说明 */}
       <section className="mx-auto max-w-content px-6 pt-section pb-10 md:pt-section-md md:pb-14">
         <Reveal>
           <p className="text-xs font-semibold uppercase tracking-wider text-accent">Support</p>
           <h1 className="mt-2 text-3xl font-semibold tracking-tight text-foreground md:text-4xl">
             联系我们
           </h1>
           <p className="mt-4 max-w-2xl text-body text-warm-muted">
             对产品有疑问、订单需要帮助，或希望商务/大客户合作，都可以在这里找到合适的联系方式。
           </p>
         </Reveal>

         {/* 两列布局：左侧联系方式，右侧留言表单 */}
         <div className="mt-10 grid gap-8 md:grid-cols-[minmax(0,1.1fr)_minmax(0,1fr)]">
           {/* 左侧：不同场景的联系入口 */}
           <Reveal delay={1}>
             <div className="space-y-5">
               <div className="rounded-2xl border border-warm-gray/40 bg-warm-white p-6 shadow-sm">
                 <h2 className="text-lg font-semibold text-foreground">订单与售后</h2>
                 <p className="mt-2 text-sm text-warm-muted">
                   订单状态、配送与退换货、保修进度等问题，建议先在
                   <Link href="/order-tracking" className="mx-1 text-accent hover:underline">
                     订单跟踪
                   </Link>
                   或
                   <Link href="/account/orders" className="mx-1 text-accent hover:underline">
                     订单状态
                   </Link>
                   中查看。如仍需帮助，可通过下方表单或邮件联系我们。
                 </p>
               </div>

               <div className="rounded-2xl border border-warm-gray/40 bg-warm-white p-6 shadow-sm">
                 <h2 className="text-lg font-semibold text-foreground">产品与安装咨询</h2>
                 <p className="mt-2 text-sm text-warm-muted">
                   如果你正在选购型号、规划桌面方案，或对安装、使用有疑问，可以先查看
                   <Link href="/support#faq" className="mx-1 text-accent hover:underline">
                     常见问题解答
                   </Link>
                   和
                   <Link href="/guide" className="mx-1 text-accent hover:underline">
                     健康办公指南
                   </Link>
                   。也欢迎在表单中简单描述你的需求，我们会给出更针对性的建议。
                 </p>
               </div>

               <div className="rounded-2xl border border-warm-gray/40 bg-warm-white p-6 shadow-sm">
                 <h2 className="text-lg font-semibold text-foreground">商务 / 大客户合作</h2>
                 <p className="mt-2 text-sm text-warm-muted">
                   团购、企业采购、渠道合作等，请在留言中注明公司名称、预计数量和大致需求，我们会安排专人跟进。
                 </p>
               </div>
             </div>
           </Reveal>

           {/* 右侧：简易联系表单（静态，无实际提交） */}
           <Reveal delay={2}>
             <div className="rounded-2xl border border-warm-gray/40 bg-warm-white p-6 shadow-sm">
               <h2 className="text-lg font-semibold text-foreground">给我们留言</h2>
               <p className="mt-2 text-sm text-warm-muted">
                 当前为演示站点，表单不会真正提交，但可以作为你未来接入表单/客服系统的参考布局。
               </p>
               <form
                 className="mt-6 space-y-4"
                 onSubmit={(e) => {
                   e.preventDefault();
                   alert("这是示意表单，实际项目中可接入后端或客服系统。");
                 }}
               >
                 <div className="space-y-1.5">
                   <label htmlFor="contact-name" className="text-xs font-medium text-warm-stone">
                     姓名
                   </label>
                   <input
                     id="contact-name"
                     type="text"
                     className="h-10 w-full rounded-xl border border-warm-gray/50 bg-warm-white px-3 text-sm text-foreground outline-none transition focus:border-accent focus:ring-1 focus:ring-accent"
                     placeholder="如何称呼你"
                   />
                 </div>
                 <div className="space-y-1.5">
                   <label htmlFor="contact-email" className="text-xs font-medium text-warm-stone">
                     邮箱
                   </label>
                   <input
                     id="contact-email"
                     type="email"
                     className="h-10 w-full rounded-xl border border-warm-gray/50 bg-warm-white px-3 text-sm text-foreground outline-none transition focus:border-accent focus:ring-1 focus:ring-accent"
                     placeholder="you@example.com"
                     required
                   />
                 </div>
                 <div className="space-y-1.5">
                   <label htmlFor="contact-topic" className="text-xs font-medium text-warm-stone">
                     咨询类型
                   </label>
                   <select
                     id="contact-topic"
                     className="h-10 w-full rounded-xl border border-warm-gray/50 bg-warm-white px-3 text-sm text-foreground outline-none transition focus:border-accent focus:ring-1 focus:ring-accent"
                     defaultValue="order"
                   >
                     <option value="order">订单 / 售后</option>
                     <option value="product">产品咨询</option>
                     <option value="business">商务合作</option>
                     <option value="other">其他</option>
                   </select>
                 </div>
                 <div className="space-y-1.5">
                   <label htmlFor="contact-message" className="text-xs font-medium text-warm-stone">
                     留言
                   </label>
                   <textarea
                     id="contact-message"
                     rows={4}
                     className="w-full rounded-xl border border-warm-gray/50 bg-warm-white px-3 py-2 text-sm text-foreground outline-none transition focus:border-accent focus:ring-1 focus:ring-accent"
                     placeholder="简单描述你的问题或需求，例如订单号、使用场景等。"
                   />
                 </div>
                 <button
                   type="submit"
                   className="mt-2 inline-flex h-10 w-full items-center justify-center rounded-xl bg-accent px-4 text-sm font-medium text-white transition hover:opacity-90"
                 >
                   发送
                 </button>
               </form>

               <div className="mt-6 border-t border-warm-gray/40 pt-4 text-xs text-warm-muted">
                 或直接发送邮件至{" "}
                 <a
                   href="mailto:support@example.com"
                   className="font-medium text-accent hover:underline"
                 >
                   support@example.com
                 </a>
                 ，并注明你的订单号（如有）。
               </div>
             </div>
           </Reveal>
         </div>
       </section>
     </main>
   );
 }

