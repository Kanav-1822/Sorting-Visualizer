"use client";

import React, { useState, useEffect } from "react";
import { SortAlgorithms } from "../utils/sortAlgorithms";
import { motion } from "framer-motion";
import styles from "./SortingVisualizer.module.css"

// SortingVisualizer Component
const SortingVisualizer: React.FC = () => {
    const [algorithm, setAlgorithm] = useState<number>(0);
    const [speed, setSpeed] = useState<number>(0.75);
    const [arraySize, setArraySize] = useState<number>(10);
    const [array, setArray] = useState<number[]>([]);
    const [isSorting, setIsSorting] = useState<boolean>(false);

    // Function to generate a new random array
    const generateArray = () => {
        let newArray: number[] = [];
        let lowerBound = 10;
        let upperBound = 100;

        for (let i = 0; i < arraySize; ++i) {
            let randomNumber = Math.floor(
                Math.random() * (upperBound - lowerBound + 1) + lowerBound
            );
            newArray.push(randomNumber);
        }
        setArray(newArray);
        
        setTimeout(() => {
            document.querySelectorAll(".cell").forEach((bar) => {
                bar.classList.remove(
                    "current", 
                    "min", 
                    "done",
                    "swap-first",
                    "swap-second",
                    "moving",
                    "pivot",
                    "checking",
                    "temp-position",
                    "tracked",
                    "out-of-place",
                    "highlight"
                );
            });
        }, 10);
    };

    // Function to handle sorting
    const startSorting = async () => {
        if (algorithm === 0) {
            alert("No Algorithm Selected");
            return;
        }

        setIsSorting(true);
        let sortAlgo = new SortAlgorithms(speed);
        switch (algorithm) {
            case 1:
                await sortAlgo.BubbleSort();
                break;
            case 2:
                await sortAlgo.SelectionSort();
                break;
            case 3:
                await sortAlgo.InsertionSort();
                break;
            case 4:
                await sortAlgo.MergeSort();
                break;
            case 5:
                await sortAlgo.QuickSort();
                break;
            default:
                break;
        }
        setIsSorting(false);
    };

    // Update title text when algorithm changes
    const getAlgorithmTitle = () => {
        switch (algorithm) {
            case 1:
                return "Bubble Sort";
            case 2:
                return "Selection Sort";
            case 3:
                return "Insertion Sort";
            case 4:
                return "Merge Sort";
            case 5:
                return "Quick Sort";
            default:
                return "Select an Algorithm";
        }
    };

    // Get algorithm description
    const getAlgorithmDescription = () => {
        switch (algorithm) {
            case 1:
                return "Compares adjacent elements and swaps them if they're in the wrong order";
            case 2:
                return "Finds minimum element and places it at the beginning of unsorted portion";
            case 3:
                return "Builds sorted array one item at a time by shifting elements as needed";
            case 4:
                return "Divides array, sorts divisions, and merges them back together";
            case 5:
                return "Selects a pivot element and partitions array around that pivot";
            default:
                return "Choose an algorithm to see its description";
        }
    };

    // Effect to generate array when array size changes or sorting completes
    useEffect(() => {
        generateArray();
    }, [arraySize, algorithm]);

    return (
        <motion.div 
            className={styles.sortingVisualizer}
            initial={{ opacity: 0, y: -20 }} 
            animate={{ opacity: 1, y: 0 }} 
            transition={{ duration: 0.5 }}
        >
            {/* Algorithm Title */}
            <motion.h2 
                className={styles.algoTitle}
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.3, duration: 0.5 }}
            >
                {getAlgorithmTitle()}
            </motion.h2>
            
            <motion.p
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.4, duration: 0.5 }}
            >
                {getAlgorithmDescription()}
            </motion.p>

            {/* Array Container with Legend */}
            <motion.div 
                className={styles.arrayContainer}
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ delay: 0.1, duration: 0.5 }}
            >
                {array.map((value, index) => (
                    <motion.div
                        key={index}
                        className={`${styles.cell} cell`}
                        style={{ 
                            height: `${4.2 * value}px`,
                            width: "35px"
                        }}
                        data-value={value}
                        whileHover={{ scale: 1.1 }}
                        transition={{ duration: 0.3 }}
                    >
                        {value}
                    </motion.div>
                ))}
                
                {/* Legend */}
                <div className={styles.legend}>
                    <h4 style={{ margin: "0 0 8px 0" }}>Color Legend</h4>
                    <div className={styles.legendItem}>
                        <div className={styles.legendColor} style={{ background: "linear-gradient(to top, #3498db, #2980b9)" }}></div>
                        <span>Unsorted</span>
                    </div>
                    <div className={styles.legendItem}>
                        <div className={styles.legendColor} style={{ background: "linear-gradient(to top, #f39c12, #e67e22)" }}></div>
                        <span>Comparing</span>
                    </div>
                    <div className={styles.legendItem}>
                        <div className={styles.legendColor} style={{ background: "linear-gradient(to top, #9b59b6, #8e44ad)" }}></div>
                        <span>Swapping</span>
                    </div>
                    <div className={styles.legendItem}>
                        <div className={styles.legendColor} style={{ background: "linear-gradient(to top, #2ecc71, #27ae60)" }}></div>
                        <span>Sorted</span>
                    </div>
                    {algorithm === 2 && (
                        <div className={styles.legendItem}>
                            <div className={styles.legendColor} style={{ background: "linear-gradient(to top, #e74c3c, #c0392b)" }}></div>
                            <span>Minimum</span>
                        </div>
                    )}
                    {algorithm === 3 && (
                        <div className={styles.legendItem}>
                            <div className={styles.legendColor} style={{ background: "linear-gradient(to top, #1abc9c, #16a085)" }}></div>
                            <span>Moving</span>
                        </div>
                    )}
                    {algorithm === 5 && (
                        <div className={styles.legendItem}>
                            <div className={styles.legendColor} style={{ background: "linear-gradient(to top, #34495e, #2c3e50)" }}></div>
                            <span>Pivot</span>
                        </div>
                    )}
                </div>
            </motion.div>

            {/* Controls */}
            <motion.div
                className={styles.navbar}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.2, duration: 0.5 }}
            >
                <button onClick={generateArray} disabled={isSorting} className={styles.button}>
                    Generate Array
                </button>

                <select
                    value={algorithm}
                    onChange={(e) => setAlgorithm(Number(e.target.value))}
                    disabled={isSorting}
                    className={styles.select}
                >
                    <option value="0">Choose algorithm</option>
                    <option value="1">Bubble Sort</option>
                    <option value="2">Selection Sort</option>
                    <option value="3">Insertion Sort</option>
                    <option value="4">Merge Sort</option>
                    <option value="5">Quick Sort</option>
                </select>

                <select
                    value={arraySize}
                    onChange={(e) => setArraySize(Number(e.target.value))}
                    disabled={isSorting}
                    className={styles.select}
                >
                    <option value="5">5 Items</option>
                    <option value="10">10 Items</option>
                    <option value="15">15 Items</option>
                    <option value="20">20 Items</option>
                </select>

                <select
                    value={speed}
                    onChange={(e) => setSpeed(Number(e.target.value))}
                    disabled={isSorting}
                    className={styles.select}
                >
                    <option value="0.5">Slow (0.5x)</option>
                    <option value="0.75">Medium (0.75x)</option>
                    <option value="1">Fast (1.0x)</option>
                </select>

                <button 
                    onClick={startSorting} 
                    disabled={isSorting} 
                    className={styles.button}
                >
                    {isSorting ? "Sorting..." : "Start Sort"}
                </button>
            </motion.div>
        </motion.div>
    );
};

export default SortingVisualizer;