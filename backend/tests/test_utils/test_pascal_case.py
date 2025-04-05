from utils.pascal_case import to_pascal_case

def test_hyphenated_string():
    assert to_pascal_case("hello-world") == "Hello World"

def test_underscored_string():
    assert to_pascal_case("fast_api_project") == "Fast Api Project"

def test_mixed_separators():
    assert to_pascal_case("python-fast_api_test") == "Python Fast Api Test"

def test_already_pascal():
    assert to_pascal_case("Already Pascal") == "Already Pascal"

def test_empty_string():
    assert to_pascal_case("") == ""

def test_multiple_separators():
    assert to_pascal_case("hello--world__again") == "Hello World Again"

def test_uppercase_and_lowercase():
    assert to_pascal_case("HELLO-world_test") == "Hello World Test"

def test_single_word():
    assert to_pascal_case("oneword") == "Oneword"
