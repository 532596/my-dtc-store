/** 首页与支持页共用的 FAQ；文案保持简短，便于手风琴与搜索。 */

export type FaqItem = {
  id: string;
  questionZh: string;
  questionEn: string;
  answer: string;
};

export type FaqGroup = {
  id: string;
  titleZh: string;
  titleEn: string;
  items: FaqItem[];
};

export const FAQ_GROUPS: FaqGroup[] = [
  {
    id: "faq-tech",
    titleZh: "科技与无感升降",
    titleEn: "Technology",
    items: [
      {
        id: "faq-q1",
        questionZh: "无感升降有多慢？会打扰专注吗？",
        questionEn: "How slow is Subtle Shift?",
        answer:
          "升降以毫米/秒量级的极慢速度完成，站起过程可持续数分钟，几乎无感。设计目标就是在不打断心流的前提下完成姿态切换。",
      },
      {
        id: "faq-q2",
        questionZh: "支持哪些大模型 API？如何连接？",
        questionEn: "Which LLM APIs are supported?",
        answer:
          "支持 OpenAI、Anthropic 等主流 API。在桌面端伴侣应用中填入 Key，与桌内控制模块同步，可在本地触发专注模式与 Flow 会话。",
      },
    ],
  },
  {
    id: "faq-material",
    titleZh: "材质与参数",
    titleEn: "Materials & specs",
    items: [
      {
        id: "faq-q3",
        questionZh: "1600×800mm 桌面是一整块还是拼接？",
        questionEn: "Is the desktop one piece?",
        answer:
          "一整块 1600×800mm 连续台面，ENF 级基材，静电喷粉哑光（矩阵黑 / 量子白），耐刮、低反光。",
      },
      {
        id: "faq-q4",
        questionZh: "升到最高时稳吗？",
        questionEn: "Stability at max height?",
        answer:
          "三节双电机商用级骨架，满升程仍可重度打字，显示器与杯具不易晃动。",
      },
      {
        id: "faq-q5",
        questionZh: "双屏 / 三屏支架能装吗？",
        questionEn: "Monitor arms?",
        answer:
          "桌沿结构兼容常见 C 型夹具支架，并与底部理线系统互不干涉。",
      },
    ],
  },
  {
    id: "faq-shipping",
    titleZh: "发货与物流",
    titleEn: "Shipping",
    items: [
      {
        id: "faq-q6",
        questionZh: "为什么众筹价不含运费？",
        questionEn: "Why isn’t shipping in the pledge?",
        answer:
          "整机较重（约 45–50kg 包装），各地区运费差异大。Campaign 结束后在 Pledge Manager 中按地址结算，价格透明。",
      },
      {
        id: "faq-q7",
        questionZh: "全球物流怎么做？",
        questionEn: "Global shipping?",
        answer:
          "美/欧/英/澳：海运至当地仓再尾程派送；亚太等多从马来西亚/中国工厂直发，缩短在途、降低破损风险。",
      },
    ],
  },
  {
    id: "faq-warranty",
    titleZh: "售后与质保",
    titleEn: "Warranty",
    items: [
      {
        id: "faq-q8",
        questionZh: "「10 年硬核质保」保什么？",
        questionEn: "What does the 10-year warranty cover?",
        answer:
          "结构件与电机、升降机构等核心机械部分 10 年；控制面板与内置 AI 等电子件 3 年。",
      },
    ],
  },
];
