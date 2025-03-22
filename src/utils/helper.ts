"use strict";

export class Helper {
    private time: number;
    private list: NodeListOf<HTMLElement>;

    constructor(time: number, list: NodeListOf<HTMLElement>) {
        this.time = Math.floor(400 / time);
        this.list = list;
    }

    mark = async (index: number): Promise<void> => {
        // Remove any existing state classes
        this.list[index].classList.remove("current", "checking", "min", "swap-first", "swap-second", "moving");
        // Add comparing state
        this.list[index].classList.add("current", "checking");
        await this.pause();
    };

    markSpl = async (index: number): Promise<void> => {
        // Remove any existing state classes
        this.list[index].classList.remove("current", "checking", "min", "swap-first", "swap-second", "moving");
        // Add minimum/pivot state
        this.list[index].classList.add("min");
        await this.pause();
    };

    unmark = async (index: number): Promise<void> => {
        this.list[index].classList.remove("current", "checking", "min", "swap-first", "swap-second", "moving");
        await this.pause();
    };

    pause = async (): Promise<void> => {
        return new Promise((resolve) => {
            setTimeout(resolve, this.time);
        });
    };

    compare = async (index1: number, index2: number): Promise<boolean> => {
        await this.pause();
        const value1 = Number(this.list[index1].getAttribute("data-value"));
        const value2 = Number(this.list[index2].getAttribute("data-value"));
        return value1 > value2;
    };

    swap = async (index1: number, index2: number): Promise<void> => {
        // Add swapping state
        this.list[index1].classList.remove("current", "checking", "min");
        this.list[index2].classList.remove("current", "checking", "min");
        this.list[index1].classList.add("swap-first");
        this.list[index2].classList.add("swap-second");
        
        await this.pause();

        const value1 = this.list[index1].getAttribute("data-value");
        const value2 = this.list[index2].getAttribute("data-value");

        if (value1 !== null && value2 !== null) {
            this.list[index1].setAttribute("data-value", value2);
            this.list[index1].style.height = `${3.8 * Number(value2)}px`;
            this.list[index1].innerText = value2;

            this.list[index2].setAttribute("data-value", value1);
            this.list[index2].style.height = `${3.8 * Number(value1)}px`;
            this.list[index2].innerText = value1;
        }

        await this.pause();

        // Remove swapping state
        this.list[index1].classList.remove("swap-first");
        this.list[index2].classList.remove("swap-second");
    };

    markDone = async (index: number): Promise<void> => {
        this.list[index].classList.remove("current", "checking", "min", "swap-first", "swap-second", "moving");
        this.list[index].classList.add("done");
        await this.pause();
    };
}