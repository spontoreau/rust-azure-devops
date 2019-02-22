fn main() {
    println!("Factorial of 0: {}", factorial(0));
    println!("Factorial of 1: {}", factorial(1));
    println!("Factorial of 2: {}", factorial(2));
    println!("Factorial of 5: {}", factorial(5));
    println!("Factorial of 9: {}", factorial(9));
}

fn factorial(n: u32) -> u32 {
    return if n >= 1 { n * factorial(n - 1) } else { 1 };
}