import re

def to_pascal_case(text: str) -> str:
    words = re.sub(r'[-_]', ' ', text).split()
    pascal_case_text = ' '.join(word.capitalize() for word in words)
    return pascal_case_text