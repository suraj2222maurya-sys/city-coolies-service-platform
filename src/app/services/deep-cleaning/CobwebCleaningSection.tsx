from pathlib import Path

src = Path("/mnt/data/CobwebCleaningSection.FINAL.tsx")
out = Path("/mnt/data/CobwebCleaningSection.COMPLETE_ENGLISH.tsx")

text = src.read_text(encoding="utf-8")

# Small formatting cleanup only; no behavior/style/image changes.
text = text.replace(
    'const FEATURED_SERVICE_ID = "full-room-cobweb-cleaning";\n\n\n',
    'const FEATURED_SERVICE_ID = "full-room-cobweb-cleaning";\n\n',
)
text = text.replace(
    '    );\n\n\n  return (',
    '    );\n\n  return (',
)

out.write_text(text, encoding="utf-8")

required = [
    'COBWEB_SITE_SURVEY_FEE',
    'Book ₹500 Site Survey',
    'fullPayment',
    'Full ₹500 Online Payment',
    'Final cleaning price will be confirmed after site inspection.',
    'const COBWEB_CLEANING_STYLES = `',
]
missing = [item for item in required if item not in text]

print("Created:", out)
print("Lines:", len(text.splitlines()))
print("Missing required items:", missing)
