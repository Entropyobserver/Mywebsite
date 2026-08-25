from pathlib import Path

import matplotlib.pyplot as plt
import numpy as np
from matplotlib.patches import FancyBboxPatch, FancyArrowPatch


OUTPUT_DIR = Path(__file__).resolve().parents[1] / "public" / "projects" / "modular-lora-experts"
OUTPUT_DIR.mkdir(parents=True, exist_ok=True)

NAVY = "#111827"
BLUE = "#2563eb"
TEAL = "#0f9f8f"
ORANGE = "#f97316"
PURPLE = "#7c3aed"
GRAY = "#64748b"
LIGHT = "#e2e8f0"


fig, ax = plt.subplots(figsize=(12, 6.75))
fig.patch.set_facecolor("#f8fafc")
ax.set_xlim(0, 12)
ax.set_ylim(0, 6.75)
ax.axis("off")
ax.add_patch(plt.Rectangle((0, 5.75), 12, 1, color=NAVY))
ax.text(0.42, 6.18, "Beyond Routing: Modular LoRA Experts for Domain MT",
        color="white", fontsize=22, va="center", fontweight="medium")
ax.text(0.44, 5.35, "Language-specific adaptation, target-anchored synthesis, and routing diagnostics",
        color="#334155", fontsize=13.5, va="center")

box_specs = [
    (0.52, BLUE, "DOMAIN DATA", ["EN–NO authentic pairs", "DE / FR / NL synthetic", "Norwegian target anchor"]),
    (3.42, PURPLE, "LORA EXPERT BANK", ["4 language experts", "frozen NLLB-200", "0.76% per expert"]),
    (6.32, ORANGE, "LEARNED ROUTER", ["mean-pooled encoder", "hard expert selection", "64.8% top-1 accuracy"]),
    (9.22, TEAL, "DIAGNOSIS", ["specialized experts", "shared target capacity", "routing is not enough"]),
]
for x0, color, title, lines in box_specs:
    ax.add_patch(FancyBboxPatch((x0, 2.45), 2.25, 2.35,
                                boxstyle="round,pad=0.12,rounding_size=0.14",
                                linewidth=2, edgecolor=color, facecolor="white"))
    ax.text(x0 + 0.18, 4.36, title, fontsize=10.8, fontweight="bold", color=NAVY)
    for index, line in enumerate(lines):
        ax.text(x0 + 0.18, 3.82 - index * 0.42, line, fontsize=10.2, color="#475569")
for x0 in (2.84, 5.74, 8.64):
    ax.add_patch(FancyArrowPatch((x0, 3.62), (x0 + 0.48, 3.62), arrowstyle="-|>",
                                 mutation_scale=17, color="#475569", linewidth=2))

cards = [
    (0.52, "DATA", "41,527 synthetic\ntraining pairs"),
    (3.42, "QUALITY", "4.86 / 5 human-rated\nsource adequacy"),
    (6.32, "RESULT", "61.0 BLEU: shared LoRA\n0.726 FTA: experts"),
    (9.22, "KEY FINDING", "+12.8 pp routing\n→ only +0.5 BLEU"),
]
for x0, label, value in cards:
    ax.add_patch(FancyBboxPatch((x0, 0.45), 2.25, 1.32,
                                boxstyle="round,pad=0.12,rounding_size=0.12",
                                linewidth=1.2, edgecolor="#cbd5e1", facecolor="white"))
    ax.text(x0 + 0.18, 1.43, label, fontsize=10.2, fontweight="bold", color=NAVY)
    ax.text(x0 + 0.18, 0.94, value, fontsize=9.7, color="#475569", va="center")

fig.savefig(OUTPUT_DIR / "cover.png", dpi=160, bbox_inches="tight", pad_inches=0, facecolor="#f8fafc")
plt.close(fig)


def style_axis(ax):
    ax.spines[["top", "right"]].set_visible(False)
    ax.spines[["left", "bottom"]].set_color("#cbd5e1")
    ax.tick_params(colors=GRAY, labelsize=10)
    ax.grid(axis="y", color=LIGHT, linewidth=0.8, alpha=0.8)
    ax.set_axisbelow(True)


systems = ["Google MT", "Independent\nExperts", "Multitask\nLoRA", "MoE"]
bleu = [48.0, 59.1, 61.0, 58.4]
fta = [0.708, 0.726, 0.713, 0.711]
colors = [GRAY, TEAL, BLUE, PURPLE]

fig, axes = plt.subplots(1, 2, figsize=(12, 5.6))
fig.patch.set_facecolor("white")
fig.suptitle("Adaptation Results Across Four Source Languages", fontsize=19, fontweight="bold", color=NAVY)
fig.subplots_adjust(left=0.07, right=0.98, bottom=0.25, top=0.78, wspace=0.19)

for ax, values, title, ylim, fmt in [
    (axes[0], bleu, "Average BLEU", (44, 63), "{:.1f}"),
    (axes[1], fta, "Average terminology recall (FTA)", (0.69, 0.735), "{:.3f}"),
]:
    bars = ax.bar(np.arange(len(systems)), values, color=colors, width=0.68)
    ax.set_xticks(np.arange(len(systems)), systems)
    ax.set_ylim(*ylim)
    ax.set_title(title, fontsize=14, fontweight="bold", color=NAVY, pad=12)
    style_axis(ax)
    for bar, value in zip(bars, values):
        ax.text(bar.get_x() + bar.get_width() / 2, value + (ylim[1] - ylim[0]) * 0.018,
                fmt.format(value), ha="center", va="bottom", fontsize=11, fontweight="bold", color=NAVY)

fig.text(0.5, 0.035,
         "Multitask LoRA leads on BLEU; independent experts recover the most expected petroleum terms.\n"
         "DE/FR/NL results use held-out synthetic-source inputs paired with authentic Norwegian targets.",
         ha="center", va="bottom", fontsize=10.5, color=GRAY)
fig.savefig(OUTPUT_DIR / "system-performance.png", dpi=180, bbox_inches="tight", facecolor="white")
plt.close(fig)


languages = ["DE–NO", "FR–NO", "NL–NO"]
adequacy = [4.850, 4.815, 4.920, np.nan]
fluency = [4.825, 4.620, 4.665, np.nan]
terminology = [97.3, 93.0, 93.5, np.nan]

fig, axes = plt.subplots(1, 2, figsize=(12, 5.6))
fig.patch.set_facecolor("white")
fig.suptitle("Human Validation of Synthetic Source Sentences", fontsize=19, fontweight="bold", color=NAVY)
fig.subplots_adjust(left=0.07, right=0.98, bottom=0.22, top=0.78, wspace=0.18)
x = np.arange(3)
w = 0.34
bars1 = axes[0].bar(x - w / 2, adequacy[:3], w, label="Adequacy", color=BLUE)
bars2 = axes[0].bar(x + w / 2, fluency[:3], w, label="Fluency", color=TEAL)
axes[0].set_xticks(x, languages)
axes[0].set_ylim(4.4, 5.0)
axes[0].set_title("Mean score (1–5)", fontsize=14, fontweight="bold", color=NAVY)
axes[0].legend(frameon=False, loc="lower left")
style_axis(axes[0])
for bars in (bars1, bars2):
    for bar in bars:
        axes[0].text(bar.get_x() + bar.get_width() / 2, bar.get_height() + 0.012,
                     f"{bar.get_height():.2f}", ha="center", va="bottom", fontsize=10, fontweight="bold")

bars = axes[1].bar(x, terminology[:3], color=[BLUE, ORANGE, TEAL], width=0.62)
axes[1].set_xticks(x, languages)
axes[1].set_ylim(88, 100)
axes[1].set_title("Terminology accuracy", fontsize=14, fontweight="bold", color=NAVY)
style_axis(axes[1])
for bar, value in zip(bars, terminology[:3]):
    axes[1].text(bar.get_x() + bar.get_width() / 2, value + 0.25, f"{value:.1f}%",
                 ha="center", va="bottom", fontsize=11, fontweight="bold", color=NAVY)
fig.text(0.5, 0.04, "Two annotators reviewed 100 synthetic sentences per language; overall adequacy was 4.86/5 and terminology accuracy 94.4%.",
         ha="center", fontsize=10.5, color=GRAY)
fig.savefig(OUTPUT_DIR / "synthetic-data-validation.png", dpi=180, bbox_inches="tight", facecolor="white")
plt.close(fig)


routing_languages = ["EN–NO", "DE–NO", "FR–NO", "NL–NO"]
routing_accuracy = [77.6, 40.1, 54.8, 86.8]

fig, axes = plt.subplots(1, 2, figsize=(12, 5.6), constrained_layout=True)
fig.patch.set_facecolor("white")
fig.suptitle("Routing Diagnostics: Better Routing, Small Translation Gains", fontsize=19, fontweight="bold", color=NAVY)

bars = axes[0].bar(np.arange(4), routing_accuracy, color=[BLUE, ORANGE, TEAL, PURPLE], width=0.65)
axes[0].axhline(64.8, color=GRAY, linestyle="--", linewidth=1.5, label="Overall: 64.8%")
axes[0].set_xticks(np.arange(4), routing_languages)
axes[0].set_ylim(0, 100)
axes[0].set_title("Hard-routing top-1 accuracy", fontsize=14, fontweight="bold", color=NAVY)
axes[0].legend(frameon=False, loc="upper left")
style_axis(axes[0])
for bar, value in zip(bars, routing_accuracy):
    axes[0].text(bar.get_x() + bar.get_width() / 2, value + 2, f"{value:.1f}%",
                 ha="center", fontsize=11, fontweight="bold", color=NAVY)

routing = [64.8, 77.6, 100.0]
route_bleu = [58.4, 58.9, 59.1]
labels = ["Learned MoE", "LangID router", "Oracle expert"]
axes[1].plot(routing, route_bleu, color=BLUE, linewidth=2.5, marker="o", markersize=8)
for xval, yval, label in zip(routing, route_bleu, labels):
    axes[1].annotate(f"{label}\n{yval:.1f} BLEU", (xval, yval), xytext=(0, 12),
                     textcoords="offset points", ha="center", fontsize=10, fontweight="bold", color=NAVY)
axes[1].set_xlim(59, 104)
axes[1].set_ylim(58.1, 59.35)
axes[1].set_xlabel("Routing accuracy (%)", color=GRAY)
axes[1].set_ylabel("Average BLEU", color=GRAY)
axes[1].set_title("Routing accuracy vs. translation quality", fontsize=14, fontweight="bold", color=NAVY)
style_axis(axes[1])
axes[1].text(71.2, 58.28, "+12.8 pp routing → +0.5 BLEU", ha="center", fontsize=10.5,
             color=ORANGE, fontweight="bold")
fig.savefig(OUTPUT_DIR / "routing-diagnostics.png", dpi=180, bbox_inches="tight", facecolor="white")
plt.close(fig)
