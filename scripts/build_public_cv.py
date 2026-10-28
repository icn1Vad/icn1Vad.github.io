"""Build the public English CV. Never reads or modifies the private master CV."""
from pathlib import Path
from reportlab.platypus import SimpleDocTemplate, Paragraph, Spacer, KeepTogether
from reportlab.lib.styles import ParagraphStyle
from reportlab.lib.colors import HexColor
from reportlab.lib.enums import TA_LEFT
from reportlab.lib.pagesizes import A4
ROOT=Path(__file__).resolve().parents[1]
OUT=ROOT/'public'/'assets'/'kaifeng-yan-cv.pdf'
OUT.parent.mkdir(parents=True,exist_ok=True)
ink=HexColor('#21322d');muted=HexColor('#53635c');accent=HexColor('#175c51')
styles={
 'name':ParagraphStyle('Name',fontName='Helvetica-Bold',fontSize=23,leading=27,textColor=ink,spaceAfter=5),
 'role':ParagraphStyle('Role',fontName='Helvetica',fontSize=10,leading=13,textColor=accent,spaceAfter=5),
 'contact':ParagraphStyle('Contact',fontName='Helvetica',fontSize=9,leading=12,textColor=muted,spaceAfter=10),
 'body':ParagraphStyle('Body',fontName='Helvetica',fontSize=9.7,leading=12.7,textColor=ink,spaceAfter=5),
 'section':ParagraphStyle('Section',fontName='Helvetica-Bold',fontSize=10.8,leading=14,textColor=accent,spaceBefore=9,spaceAfter=6,borderWidth=.4,borderColor=HexColor('#d7e0d5'),borderPadding=0),
 'entry':ParagraphStyle('Entry',fontName='Helvetica-Bold',fontSize=9.8,leading=12.8,textColor=ink,spaceAfter=2),
 'bullet':ParagraphStyle('Bullet',fontName='Helvetica',fontSize=9.5,leading=12.3,textColor=ink,leftIndent=10,firstLineIndent=-7,spaceAfter=3),
}
story=[]
def p(text,style='body'):story.append(Paragraph(text,styles[style]))
def section(t):p(t.upper(),'section')
def bullet(t):p('&#8226; '+t,'bullet')
p('KAIFENG YAN','name')
p('Full-Stack Development  /  AI Agent Applications  /  AI Product Internships','role')
p('<link href="mailto:yankf@163.com" color="#175c51">yankf@163.com</link>  |  <link href="https://github.com/icn1Vad" color="#175c51">github.com/icn1Vad</link>  |  <link href="https://icn1vad.github.io/" color="#175c51">icn1vad.github.io</link>','contact')
p('Computer science master\'s student at HKU with experience in enterprise AI product design, web development, and agent-system integration. Work across product workflows, interactive frontend demos, customer communication, and cross-service collaboration for document review.')
section('Education')
p('The University of Hong Kong  <font name="Helvetica" color="#53635c">|  Sep 2026 - 2028 (expected)</font>','entry')
p('MSc in Computer Science, full-time. AI &amp; Decentralized Technologies stream.<br/>University-level academic scholarship.')
p('Lanzhou University  <font name="Helvetica" color="#53635c">|  Sep 2021 - Jun 2025</font>','entry')
p('BEng in Computer Science and Technology, Data Science track.')
section('Core project')
p('ProofSpace - Enterprise Contract &amp; Policy Review Agent  <font name="Helvetica" color="#53635c">|  Mar 2026 - present</font>','entry')
p('Co-founder, Suzhou Aituge AI Technology Co., Ltd. since Jun 2026. AI product design and full-stack development within a three-person technical team.')
bullet('Designed policy-ingestion, entity-identification, rule-selection, and risk-review flows; supported enterprise product discussions and interactive frontend demonstrations.')
bullet('Developed React / Next.js pages and task lists; integrated server-side pagination, request deduplication, session-scoped caching, background refresh, retry behavior, and unit tests.')
bullet('Contributed to Web / Java / Python service boundaries and asynchronous Task / Run / Event / Artifact workflows, connecting business state with agent execution.')
bullet('Designed document / risk-panel interactions, source highlighting, proposed-change comparisons, citation-based questions, and report export; contributed to memory and evidence-alignment approaches.')
section('Internships')
p('China Electronics Engineering Design Institute  <font name="Helvetica" color="#53635c">|  Mar - May 2026</font>','entry')
p('Software development intern, Beijing. Organized OA and design-document workflow fields, interface requirements, and engineering documents; supported prototype testing and delivery documentation.')
p('Sinopec Shengli Oilfield, Geophysical Research Institute  <font name="Helvetica" color="#53635c">|  Jul - Sep 2023</font>','entry')
p('Data analysis intern. Contributed to AI-module integration, random-forest and SVM prediction experiments, parameter tuning, and information-system maintenance.')
section('Personal and university projects')
bullet('<b>GPT-Mindmap:</b> team contribution to a Flask-based mind-map website integrating database, ChatGPT, and XMind interfaces. Completed university innovation project.')
bullet('<b>Posture monitoring:</b> contributed to TensorFlow.js / MoveNet keypoint detection, data collection, annotation, and training. Team won third prize in the 2023 Gansu provincial e-commerce innovation competition selection.')
bullet('<b>GNNShap-to-Cancer (undergraduate thesis):</b> adapted CGMega / MCF7 graph data and model inputs; ran sampling and weighted least-squares explanation experiments; analyzed memory limits and solver failures.')
section('Technical skills')
p('<b>Web:</b> TypeScript / JavaScript, React / Next.js, Vue, Python, Java, SQL, REST APIs.<br/><b>AI and data:</b> tool calling, agent context and memory, structured extraction, evidence alignment, PyTorch / PyG, PySpark.<br/><b>Engineering:</b> Git, Linux / Shell, Docker, SSH, Vitest, interface integration.')
def footer(canvas,doc):
 canvas.saveState();canvas.setFillColor(muted);canvas.setFont('Helvetica',7.5);canvas.drawString(35,22,'Public CV - October 2026');canvas.drawRightString(A4[0]-35,22,str(doc.page));canvas.restoreState()
doc=SimpleDocTemplate(str(OUT),pagesize=A4,leftMargin=35,rightMargin=35,topMargin=30,bottomMargin=32,title='Kaifeng Yan - Public CV',author='Kaifeng Yan')
doc.build(story,onFirstPage=footer,onLaterPages=footer)
print(OUT)
