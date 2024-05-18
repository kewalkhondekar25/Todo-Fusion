import React from 'react'
import { Button } from './ui/button';

const Slider = () => {
  const fruits: string[] = [
    "Apple",        // A
    "Banana",       // B
    "Cherry",       // C
    "Date",         // D
    "Elderberry",   // E
    "Fig",          // F
    "Grape",        // G
    "Honeydew",     // H
    "Indian Fig",   // I
    "Jackfruit",    // J
    "Kiwi",         // K
    "Lemon",        // L
    "Mango",        // M
    "Nectarine",    // N
    "Orange",       // O
    "Papaya",       // P
    "Quince",       // Q
    "Raspberry",    // R
    "Strawberry",   // S
    "Tangerine",    // T
    "Ugli Fruit",   // U
    "Voavanga",     // V
    "Watermelon",   // W
    "Xigua",        // X
    "Yellow Passion Fruit", // Y
    "Zucchini"      // Z
  ];
  
  return (
    <section className='absolute bg-[#191919] flex'>
      <nav>
        {
          fruits.map(item => {
            return(
              <ul>
                <li>{item}</li>
              </ul>
            )
          })
        }
      </nav>
      <Button>Toggle</Button>
    </section>
  )
}

export default Slider