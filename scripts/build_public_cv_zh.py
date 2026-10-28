"""Build a matching Chinese public CV using only the selected public content."""
from pathlib import Path
import argparse
from reportlab.pdfbase import pdfmetrics
from reportlab.pdfbase.ttfonts import TTFont
from reportlab.platypus import SimpleDocTemplate, Paragraph
from reportlab.lib.styles import ParagraphStyle
from reportlab.lib.colors import HexColor
from reportlab.lib.pagesizes import A4

parser=argparse.ArgumentParser()
parser.add_argument('--font',default=r'C:\Windows\Fonts\msyh.ttc')
parser.add_argument('--bold-font',default=r'C:\Windows\Fonts\msyhbd.ttc')
args=parser.parse_args()
pdfmetrics.registerFont(TTFont('PublicCN',args.font,subfontIndex=0))
pdfmetrics.registerFont(TTFont('PublicCN-Bold',args.bold_font,subfontIndex=0))
pdfmetrics.registerFontFamily('PublicCN',normal='PublicCN',bold='PublicCN-Bold',italic='PublicCN',boldItalic='PublicCN-Bold')
ROOT=Path(__file__).resolve().parents[1]
OUT=ROOT/'public/assets/kaifeng-yan-cv-zh.pdf'
ink=HexColor('#21322d');muted=HexColor('#53635c');accent=HexColor('#175c51')
styles={
 'name':ParagraphStyle('NameCN',fontName='PublicCN-Bold',fontSize=22,leading=28,textColor=ink,spaceAfter=5),
 'role':ParagraphStyle('RoleCN',fontName='PublicCN',fontSize=10.2,leading=15,textColor=accent,spaceAfter=5),
 'contact':ParagraphStyle('ContactCN',fontName='Helvetica',fontSize=8.8,leading=12,textColor=muted,spaceAfter=10),
 'body':ParagraphStyle('BodyCN',fontName='PublicCN',fontSize=9.5,leading=14.5,textColor=ink,spaceAfter=5,wordWrap='CJK'),
 'section':ParagraphStyle('SectionCN',fontName='PublicCN-Bold',fontSize=11,leading=16,textColor=accent,spaceBefore=8,spaceAfter=6),
 'entry':ParagraphStyle('EntryCN',fontName='PublicCN-Bold',fontSize=9.6,leading=15,textColor=ink,spaceAfter=3,wordWrap='CJK'),
 'bullet':ParagraphStyle('BulletCN',fontName='PublicCN',fontSize=9.4,leading=14.3,textColor=ink,leftIndent=9,firstLineIndent=-9,spaceAfter=3,wordWrap='CJK'),
}
story=[]
def p(text,style='body'):story.append(Paragraph(text,styles[style]))
def section(t):p(t,'section')
def bullet(t):p('- '+t,'bullet')
p('严凯丰  Kaifeng Yan','name')
p('全栈开发 / AI Agent 应用 / AI 产品实习','role')
p('<link href="mailto:yankf@163.com" color="#175c51">yankf@163.com</link>  |  <link href="https://github.com/icn1Vad" color="#175c51">github.com/icn1Vad</link>  |  <link href="https://icn1vad.github.io/" color="#175c51">icn1vad.github.io</link>','contact')
p('香港大学计算机科学硕士在读，具有企业 AI 产品设计、客户沟通和 Web 开发实践。围绕合同与制度审查开展需求梳理、产品演示和前端开发，衔接业务流程、交互设计与 Agent 系统集成。')
section('教育背景')
p('香港大学 | 计算机科学理学硕士（全日制） | 2026.09 - 2028（预计）','entry')
p('AI &amp; Decentralized Technologies 方向；获校级学业奖学金。')
p('兰州大学 | 计算机科学与技术（数据科学方向），工学学士 | 2021.09 - 2025.06','entry')
section('核心项目')
p('ProofSpace | 企业合同与制度审查 Agent | 2026.03 起持续迭代','entry')
p('苏州爱兔格人工智能科技有限公司，联合创始人（2026.06 起）。在三人技术团队中参与 AI 产品设计与全栈开发。')
bullet('产品流程：参与制度导入、主体识别、规则选择和风险审查流程设计，开展企业产品沟通与交互演示。')
bullet('前端开发：开发 React / Next.js 页面与任务列表，处理分页、请求去重、会话缓存、后台刷新、失败重试与单元测试。')
bullet('系统协作：参与 Web / Java / Python 服务边界与异步 Task / Run / Event / Artifact 工作流设计，连接业务状态和 Agent 执行。')
bullet('审查交互：参与原文高亮、修改对照、引用追问和报告导出，以及上下文记忆、摘要与证据对齐方案。')
section('实习经历')
p('中国电子工程设计院股份有限公司 | 研发 / 实验室软件开发实习生 | 2026.03 - 2026.05','entry')
p('参与 OA 与设计文档的业务字段、接口需求和工程资料整理，支持原型测试与交付文档编写。')
p('中石化胜利油田物探研究院 | 数据分析师（实习） | 2023.07 - 2023.09','entry')
p('参与 AI 模块集成、随机森林与 SVM 储层预测实验、参数调整和信息系统维护。')
section('个人与本科项目')
bullet('<b>GPT-Mindmap：</b>参与 Flask 思维导图网站开发，连接数据库、ChatGPT 与 XMind 接口；校级创新项目已结项。')
bullet('<b>正姿宝：</b>参与 TensorFlow.js / MoveNet 关键点检测、采集标注与训练；团队获 2023 年三创赛甘肃省选拔赛三等奖。')
bullet('<b>GNNShap-to-Cancer（本科毕业论文）：</b>适配 CGMega / MCF7 图数据与模型输入，运行采样和加权最小二乘解释实验，分析显存限制与求解失败。')
section('技术能力')
p('<b>Web：</b>TypeScript / JavaScript、React / Next.js、Vue、Python、Java、SQL、REST API。<br/><b>AI 与数据：</b>Tool calling、Agent 上下文与记忆、结构化抽取、证据对齐、PyTorch / PyG、PySpark。<br/><b>工程：</b>Git、Linux / Shell、Docker、SSH、Vitest、接口集成。')
def footer(canvas,doc):
 canvas.saveState();canvas.setFillColor(muted);canvas.setFont('PublicCN',7.5);canvas.drawString(35,21,'公开简历 - 2026 年 10 月');canvas.drawRightString(A4[0]-35,21,str(doc.page));canvas.restoreState()
doc=SimpleDocTemplate(str(OUT),pagesize=A4,leftMargin=35,rightMargin=35,topMargin=28,bottomMargin=32,title='严凯丰 - 中文公开简历',author='Kaifeng Yan')
doc.build(story,onFirstPage=footer,onLaterPages=footer)
print(OUT)
