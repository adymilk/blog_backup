---
title: 企业级工业 AI 应用架构实践：RAG、MCP 与评测闭环如何协同
date: 2026-11-22 14:30:00
channel: technology
categories:
  - AI Agent
tags:
  - RAG
  - MCP
  - 工业数据分析
  - 数据架构
cover: /img/posts/rag-mcp-eval-pipeline.svg
description: 在企业级工业数据分析场景中，直接让 LLM 算统计指标会产生幻觉。本文探讨如何通过 MCP 封装确定性计算工具、用 RAG 注入行业规范，并依托 Golden Set 评测体系保障生产可用性。
keywords: 企业级 AI 架构, RAG, MCP, AI Agent, Golden Set 评测, 工业数据分析
featured: true
toc: true
published: true
---

把大模型接入企业级工业软件时，研发团队最先遇到的挑战往往不是模型不够聪明，而是**“严谨的工业逻辑”与“概率性的文本生成”之间的冲突**。例如在质量工程场景中，一次错误的 `Cpk` 计算或漏报一个控制图判异点（如连续 7 点上升趋势），就可能导致整批产品放行风险误判。

<!--more-->

![RAG + MCP + Golden Set 评测闭环协同架构](/img/posts/rag-mcp-eval-pipeline.svg)

## 一、核心工程原则：计算确定性，推理智能化

如上图所示，完整的企业级工业 AI 链路包含四个严格解耦的模块：**Agent 编排核心**、**Metadata-Filtered RAG**、**MCP Server 工具层**，以及**上线守门员 CI/CD Golden Set 评测**。

任何数据查询与统计运算都必须经由受控的 **MCP Tool** 执行，LLM 绝不直接连接生产数据库，也不直接参与数值计算。

## 二、用 MCP 标准化工业工具接口（含 Schema 设计）

过去每接入一个大模型，团队都要重写一套 Function Calling 适配层。通过 **MCP（Model Context Protocol）** 将企业既有的统计分析引擎（如 Minitab COM 桥接服务、SPC 计算内核、ETL 调度）封装为标准 Tool，可以同时获得强类型约束与权限隔离。

下面是一个面向工业 SPC 分析的典型 MCP Tool Schema 示例：

```json
{
  "name": "run_spc_analysis",
  "description": "对指定产线和工序的过程质量数据执行标准化 SPC 控制图与过程能力分析",
  "inputSchema": {
    "type": "object",
    "properties": {
      "line_id": { "type": "string", "description": "产线编码，例如 LINE-A01" },
      "characteristic": { "type": "string", "description": "关键质量特性(CTQ)名称" },
      "chart_type": {
        "type": "string",
        "enum": ["Xbar-R", "Xbar-S", "I-MR", "P", "NP"],
        "description": "控制图类型，必须与数据类型和子组大小匹配"
      },
      "subgroup_size": { "type": "integer", "minimum": 1, "maximum": 25 },
      "time_range_hours": { "type": "integer", "default": 24 }
    },
    "required": ["line_id", "characteristic", "chart_type", "subgroup_size"]
  }
}
```

**工程落地的关键细节**：
- **前置校验与澄清**：如果用户问“帮我看看昨天 A 线尺寸稳不稳定”，但没有指定具体特性（`characteristic`），Schema 校验会拦截不完整调用，由编排层反问用户澄清，而不是让模型瞎猜字段。
- **权限隔离视图**：MCP Tool 后端只访问脱敏与只读聚合视图，避免 Prompt 注入导致越权查询。

## 三、Metadata-Filtered RAG：别让旧版 SOP 污染新产线

通用大模型不了解工厂内部的缺陷代码体系和特定客户的检验协议。传统 RAG 常见的问题是“按固定 500 Token 切片”把表格和条件撕碎，或者把**已作废的 2022 版 SOP** 召回给当前产线。

工业知识库 RAG 必须落地两项改造：

1. **结构化元数据前置过滤**：文档入库时强制打标 `process_step`（工序）、`product_family`（产品族）、`effective_date`（生效日期）和 `status: active`。检索时先用元数据过滤缩小范围，再做向量 + 关键词（BM25）混合召回。
2. **强制引用溯源（Citation）**：输出排查建议时必须附带 `[SOP编号 · 章节]`，让质量工程师 3 秒内就能点开原文核对。

## 四、Golden Set 评测闭环：从“凭感觉调 Prompt”到工程化回归

多数企业 AI 项目停在 Demo 阶段，根因在于**没有可量化的回归评测基线**——每次改一行 Prompt 或升级模型版本，团队都不知道原本能跑通的场景是不是悄悄退化了。

在生产交付前，建议用 30–50 条真实业务高频样本建立 **Golden Set**，并在每次 CI 发布时自动跑通四项硬指标：

| 评测维度 | 校验方式 | 最低上线基线（示例） |
| :--- | :--- | :--- |
| **参数提取准确率** | 对比模型生成的 MCP JSON 参数与人工标注真值 | ≥ 95%（关键字段 100% 匹配） |
| **工具路由成功率** | 应该调用工具时是否准确触发，缺参时是否正确反问 | ≥ 95% |
| **数值零幻觉校验** | 最终回答中的所有均值、Cpk、超限点数是否与工具返回值完全一致 | 100% 一致（零容忍） |
| **SOP 引用忠实度** | 排查建议是否能在召回的上下文片段中找到原文依据 | ≥ 90% |

只有把**确定性工具边界**与**自动化评测闭环**建起来，工业 AI 才能真正从“演示好看”走向“产线敢用”。
