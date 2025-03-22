"use strict";

import { Helper } from "./helper";

export class SortAlgorithms {
    private list: NodeListOf<HTMLElement>;
    private size: number;
    private time: number;
    private helper: Helper;

    constructor(time: number) {
        this.list = document.querySelectorAll<HTMLElement>(".cell");
        this.size = this.list.length;
        this.time = time;
        this.helper = new Helper(this.time, this.list);
    }

    // **Bubble Sort**
    BubbleSort = async (): Promise<void> => {
        for (let i = 0; i < this.size - 1; ++i) {
            for (let j = 0; j < this.size - i - 1; ++j) {
                await this.helper.mark(j);
                await this.helper.mark(j + 1);
                
                if (await this.helper.compare(j, j + 1)) {
                    await this.helper.swap(j, j + 1);
                }
                
                await this.helper.unmark(j);
                await this.helper.unmark(j + 1);
            }
            await this.helper.markDone(this.size - i - 1);
        }
        await this.helper.markDone(0);
    };

    // **Insertion Sort**
    InsertionSort = async (): Promise<void> => {
        for (let i = 0; i < this.size - 1; ++i) {
            let j = i;
            while (j >= 0 && (await this.helper.compare(j, j + 1))) {
                await this.helper.mark(j);
                await this.helper.mark(j + 1);
                await this.helper.pause();
                
                await this.helper.swap(j, j + 1);
                
                await this.helper.unmark(j);
                await this.helper.unmark(j + 1);
                j -= 1;
            }
            if (j + 1 >= 0) {
                await this.helper.markDone(j + 1);
            }
        }
        await this.helper.markDone(this.size - 1);
    };

    // **Selection Sort**
    SelectionSort = async (): Promise<void> => {
        for (let i = 0; i < this.size; ++i) {
            let minIndex = i;
            
            // Add initial minimum
            await this.helper.mark(minIndex);
            
            for (let j = i; j < this.size; ++j) {
                await this.helper.mark(j);
                
                if (await this.helper.compare(minIndex, j)) {
                    await this.helper.unmark(minIndex);
                    
                    minIndex = j;
                }
                
                await this.helper.unmark(j);
            }
            
            if (minIndex !== i) {
                await this.helper.swap(minIndex, i);
            }
            
            await this.helper.markDone(i);
        }
        await this.helper.markDone(this.size - 1);
    };

    // **Merge Sort**
    MergeSort = async (): Promise<void> => {
        await this.MergeDivider(0, this.size - 1);
        this.list.forEach((cell) => cell.classList.add("done"));
    };

    private MergeDivider = async (start: number, end: number): Promise<void> => {
        if (start < end) {
            let mid = start + Math.floor((end - start) / 2);
            await this.MergeDivider(start, mid);
            await this.MergeDivider(mid + 1, end);
            await this.Merge(start, mid, end);
        }
    };

    private Merge = async (start: number, mid: number, end: number): Promise<void> => {
        let newList: number[] = [];
        let frontcounter = start;
        let midcounter = mid + 1;
    
        while (frontcounter <= mid && midcounter <= end) {
            await this.helper.mark(frontcounter);
            await this.helper.mark(midcounter);
            
            let fvalue = Number(this.list[frontcounter].getAttribute("data-value"));
            let svalue = Number(this.list[midcounter].getAttribute("data-value"));
            
            await this.helper.unmark(frontcounter);
            await this.helper.unmark(midcounter);
            
            if (fvalue >= svalue) {
                newList.push(svalue);
                ++midcounter;
            } else {
                newList.push(fvalue);
                ++frontcounter;
            }
        }
    
        while (frontcounter <= mid) {
            newList.push(Number(this.list[frontcounter].getAttribute("data-value")));
            ++frontcounter;
        }
        while (midcounter <= end) {
            newList.push(Number(this.list[midcounter].getAttribute("data-value")));
            ++midcounter;
        }
    
        for (let c = start; c <= end; ++c) {
            this.list[c].classList.add("moving");
        }
    
        for (let c = start, point = 0; c <= end && point < newList.length; ++c, ++point) {
            await this.helper.pause();
            this.list[c].setAttribute("data-value", String(newList[point]));
            this.list[c].style.height = `${3.8 * newList[point]}px`;
            this.list[c].innerText = String(newList[point]);
        }
    
        for (let c = start; c <= end; ++c) {
            this.list[c].classList.remove("moving");
        }
    };

    // **Quick Sort**
    QuickSort = async (): Promise<void> => {
        await this.QuickDivider(0, this.size - 1);
        this.list.forEach((cell) => cell.classList.add("done"));
    };

    private QuickDivider = async (start: number, end: number): Promise<void> => {
        if (start < end) {
            let pivot = await this.Partition(start, end);
            await this.QuickDivider(start, pivot - 1);
            await this.QuickDivider(pivot + 1, end);
        }
    };

    private Partition = async (start: number, end: number): Promise<number> => {
        let pivot = Number(this.list[end].getAttribute("data-value"));
        let prevIndex = start - 1;
    
        await this.helper.markSpl(end);
        for (let c = start; c < end; ++c) {
            let currValue = Number(this.list[c].getAttribute("data-value"));
            await this.helper.mark(c);
            if (currValue < pivot) {
                prevIndex += 1;
                await this.helper.mark(prevIndex);
                await this.helper.swap(c, prevIndex);
                await this.helper.unmark(prevIndex);
            }
            await this.helper.unmark(c);
        }
        await this.helper.swap(prevIndex + 1, end);
        await this.helper.unmark(end);
        return prevIndex + 1;
    };
}
