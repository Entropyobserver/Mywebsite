from pathlib import Path
from PIL import Image, ImageDraw, ImageFont


ROOT = Path(__file__).resolve().parents[1]
OUT = ROOT / "public" / "projects" / "graph-rag-evidence"
OUT.mkdir(parents=True, exist_ok=True)

NAVY = "#0f172a"
SLATE = "#475569"
LIGHT = "#f8fafc"
GRID = "#dbe3ee"
BLUE = "#2563eb"
TEAL = "#0f766e"
ORANGE = "#d97706"
PURPLE = "#7c3aed"
GREEN = "#15803d"
RED = "#dc2626"


def font(size: int, bold: bool = False):
    name = "arialbd.ttf" if bold else "arial.ttf"
    return ImageFont.truetype(f"C:/Windows/Fonts/{name}", size)


def rounded_box(draw, xy, fill, outline, title, subtitle=None, radius=20):
    draw.rounded_rectangle(xy, radius=radius, fill=fill, outline=outline, width=3)
    x1, y1, x2, y2 = xy
    center = (x1 + x2) / 2
    title_y = y1 + 24 if subtitle else (y1 + y2) / 2 - 18
    draw.text((center, title_y), title, font=font(28, True), fill=NAVY, anchor="ma")
    if subtitle:
        draw.text((center, title_y + 45), subtitle, font=font(20), fill=SLATE, anchor="ma")


def arrow(draw, start, end, color=SLATE, width=5, dashed=False):
    x1, y1 = start
    x2, y2 = end
    if dashed:
        steps = 10
        for i in range(0, steps, 2):
            a = i / steps
            b = min((i + 1) / steps, 1)
            draw.line((x1 + (x2 - x1) * a, y1 + (y2 - y1) * a,
                       x1 + (x2 - x1) * b, y1 + (y2 - y1) * b), fill=color, width=width)
    else:
        draw.line((x1, y1, x2, y2), fill=color, width=width)
    import math
    angle = math.atan2(y2 - y1, x2 - x1)
    length = 18
    for offset in (2.55, -2.55):
        draw.line((x2, y2, x2 + length * math.cos(angle + offset),
                   y2 + length * math.sin(angle + offset)), fill=color, width=width)


def save_pipeline():
    img = Image.new("RGB", (1600, 1150), LIGHT)
    d = ImageDraw.Draw(img)
    d.text((80, 55), "Controlled GraphRAG fusion", font=font(48, True), fill=NAVY)
    d.text((80, 118), "Paper Figure 1 - fixed E5 source, reranker, and candidate budget", font=font(24), fill=SLATE)

    boxes = {
        "q": (470, 190, 1130, 285),
        "cues": (390, 335, 1210, 435),
        "hybrid": (390, 485, 1210, 600),
        "base": (150, 690, 530, 820),
        "graph": (610, 690, 990, 820),
        "path": (1070, 690, 1450, 820),
        "fusion": (390, 900, 1210, 1000),
    }
    rounded_box(d, boxes["q"], "#f1f5f9", SLATE, "Question")
    rounded_box(d, boxes["cues"], "#ecfeff", TEAL, "Query cues", "Year, entity, metric")
    rounded_box(d, boxes["hybrid"], "#dbeafe", BLUE, "Year-filtered hybrid retrieval", "BM25 + E5")
    rounded_box(d, boxes["base"], "#eff6ff", BLUE, "E5 top-10", "Retained")
    rounded_box(d, boxes["graph"], "#f0fdfa", TEAL, "Selected graph", "Expansion")
    rounded_box(d, boxes["path"], "#fff7ed", ORANGE, "Graph paths", "Query-guided")
    rounded_box(d, boxes["fusion"], "#fefce8", ORANGE, "Candidate fusion", "Deduplicate; maximum 80")

    arrow(d, (800, 285), (800, 335))
    arrow(d, (800, 435), (800, 485))
    arrow(d, (800, 600), (340, 690))
    arrow(d, (800, 600), (800, 690), color=TEAL, dashed=True)
    arrow(d, (990, 385), (1260, 690), color=ORANGE, dashed=True)
    arrow(d, (340, 820), (610, 900))
    arrow(d, (800, 820), (800, 900), color=TEAL, dashed=True)
    arrow(d, (1260, 820), (990, 900), color=ORANGE, dashed=True)
    d.text((800, 1060), "Final cross-encoder reranking -> ranked evidence", font=font(28, True), fill=PURPLE, anchor="mm")
    img.save(OUT / "paper-controlled-fusion.png", quality=95)


def save_graph_schema():
    img = Image.new("RGB", (1600, 1050), LIGHT)
    d = ImageDraw.Draw(img)
    d.text((80, 55), "Typed metadata evidence graph", font=font(48, True), fill=NAVY)
    d.text((80, 118), "Paper Figure 2 - containment hierarchy with typed evidence links", font=font(24), fill=SLATE)

    rounded_box(d, (540, 180, 1060, 275), "#f3e8ff", PURPLE, "2022 Annual Report")
    rounded_box(d, (630, 325, 970, 410), "#fff7ed", ORANGE, "Year 2022")
    rounded_box(d, (250, 480, 620, 570), "#fff7ed", ORANGE, "Page 84")
    rounded_box(d, (980, 480, 1350, 570), "#fff7ed", ORANGE, "Page 91")
    object_boxes = [(130, 665, 410, 750), (470, 665, 750, 750), (850, 665, 1130, 750), (1190, 665, 1470, 750)]
    for box, label in zip(object_boxes, ["Object A", "Object B", "Object C", "Object D"]):
        rounded_box(d, box, "#eff6ff", BLUE, label)

    for start, end in [((800, 275), (800, 325)), ((800, 410), (435, 480)), ((800, 410), (1165, 480)),
                       ((435, 570), (270, 665)), ((435, 570), (610, 665)), ((1165, 570), (990, 665)), ((1165, 570), (1330, 665))]:
        arrow(d, start, end, width=4)
    d.line((270, 790, 610, 790), fill=TEAL, width=5)
    d.line((990, 790, 1330, 790), fill=TEAL, width=5)
    d.text((440, 815), "same-page", font=font(21, True), fill=TEAL, anchor="ma")
    d.text((1160, 815), "same-page", font=font(21, True), fill=TEAL, anchor="ma")
    d.line((610, 750, 990, 750), fill=GREEN, width=5)
    d.text((800, 720), "same-entity", font=font(21, True), fill=GREEN, anchor="mm")
    d.arc((270, 720, 1330, 990), 0, 180, fill=RED, width=5)
    d.text((800, 930), "same-metric", font=font(21, True), fill=RED, anchor="mm")
    img.save(OUT / "paper-graph-schema.png", quality=95)


def save_edge_ablation():
    img = Image.new("RGB", (1600, 900), LIGHT)
    d = ImageDraw.Draw(img)
    d.text((80, 55), "Which graph relations help?", font=font(48, True), fill=NAVY)
    d.text((80, 118), "Paper Figure 3 - change in Object Recall@10 when an edge type is removed", font=font(24), fill=SLATE)
    labels = ["No same-page", "No adjacent-page", "No same-entity", "No same-metric"]
    values = [0.000, 0.056, -0.020, -0.008]
    colors = [BLUE, ORANGE, GREEN, RED]
    zero_x = 850
    scale = 9000
    d.line((zero_x, 210, zero_x, 770), fill=SLATE, width=3)
    for tick in [-0.02, 0, 0.03, 0.06]:
        x = zero_x + tick * scale
        d.line((x, 770, x, 790), fill=SLATE, width=3)
        d.text((x, 812), f"{tick:+.2f}" if tick else "0", font=font(20), fill=SLATE, anchor="ma")
    for i, (label, value, color) in enumerate(zip(labels, values, colors)):
        y = 260 + i * 135
        d.text((560, y), label, font=font(27, True), fill=NAVY, anchor="rm")
        x = zero_x + value * scale
        if value == 0:
            d.ellipse((zero_x - 8, y - 8, zero_x + 8, y + 8), fill=color)
        else:
            d.rounded_rectangle((min(zero_x, x), y - 24, max(zero_x, x), y + 24), radius=10, fill=color)
        d.text((x + (18 if value >= 0 else -18), y), f"{value:+.3f}", font=font(24, True), fill=color,
               anchor="lm" if value >= 0 else "rm")
    d.text((800, 865), "Delta Object Recall@10", font=font(24, True), fill=NAVY, anchor="mm")
    img.save(OUT / "paper-edge-ablation.png", quality=95)


def save_fusion_results():
    img = Image.new("RGB", (1600, 950), LIGHT)
    d = ImageDraw.Draw(img)
    d.text((80, 55), "Controlled GraphRAG fusion", font=font(48, True), fill=NAVY)
    d.text((80, 118), "Paper Table 4 - all variants retain the same E5 output and use an 80-candidate cap", font=font(24), fill=SLATE)
    methods = ["E5 hybrid", "+ selected graph", "+ graph paths", "+ graph + paths"]
    obj = [0.838, 0.858, 0.850, 0.859]
    page = [0.908, 0.905, 0.914, 0.917]
    left, top, right, bottom = 210, 230, 1510, 790
    for value in [0.80, 0.84, 0.88, 0.92]:
        y = bottom - (value - 0.78) / 0.16 * (bottom - top)
        d.line((left, y, right, y), fill=GRID, width=2)
        d.text((left - 25, y), f"{value:.2f}", font=font(20), fill=SLATE, anchor="rm")
    group_w = (right - left) / len(methods)
    for i, method in enumerate(methods):
        cx = left + group_w * (i + 0.5)
        for j, (value, color) in enumerate([(obj[i], BLUE), (page[i], TEAL)]):
            x1 = cx - 82 + j * 92
            y = bottom - (value - 0.78) / 0.16 * (bottom - top)
            d.rounded_rectangle((x1, y, x1 + 72, bottom), radius=10, fill=color)
            d.text((x1 + 36, y - 16), f"{value:.3f}", font=font(21, True), fill=color, anchor="ms")
        d.text((cx, bottom + 55), method, font=font(22, True), fill=NAVY, anchor="ma")
    d.rectangle((1080, 155, 1110, 185), fill=BLUE)
    d.text((1125, 170), "Object Recall@10", font=font(22), fill=NAVY, anchor="lm")
    d.rectangle((1080, 195, 1110, 225), fill=TEAL)
    d.text((1125, 210), "Page Recall@10", font=font(22), fill=NAVY, anchor="lm")
    d.text((800, 910), "Selected-graph candidates drive object recovery; paths add complementary page coverage.",
           font=font(25, True), fill=NAVY, anchor="mm")
    img.save(OUT / "paper-controlled-fusion-results.png", quality=95)


if __name__ == "__main__":
    save_pipeline()
    save_graph_schema()
    save_edge_ablation()
    save_fusion_results()
    print(f"Wrote GraphRAG paper figures to {OUT}")
