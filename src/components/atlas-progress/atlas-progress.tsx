import { Component, Prop, PropDidChange } from "@stencil/core";

@Component({
  tag: "atlas-progress",
  styleUrl: "atlas-progress.scss"
})
export class AtlasProgress {
  private width: number = 0;
  private direction: number = 1; // 1 = plus, 2 = minus
  private intervalInstance;
  @Prop() speed: number;

  @Prop() color: string;

  @Prop() running: boolean;
  @PropDidChange("running")
  didChangeHandler(value: boolean) {
    if (!value) clearInterval(this.intervalInstance);
    else this.move();
  }

  componentDidLoad() {
    if (this.running) this.move();
  }

  render() {
    return (
      <div id="atlas-progress-wrapper">
        <div id="atlas-progress-1">
          <div class="atlas-element" id="atlas-left" />
        </div>
        <div id="atlas-progress-2">
          <div class="atlas-element" id="atlas-right" />
        </div>
      </div>
    );
  }

  private move() {
    let elemLeft = document.getElementById("atlas-left");
    let elemRight = document.getElementById("atlas-right");
    elemLeft.style.width = this.width + "%";
    elemRight.style.width = this.width + "%";
    elemLeft.style.cssFloat = "right";

    this.setColor(elemLeft, elemRight);
    let speed = this.getSpeed();

    this.intervalInstance = setInterval(() => {
      this.frame(elemLeft, elemRight);
    }, speed);
  }

  private frame(elemLeft, elemRight) {
    if (this.width === 100 && this.direction === 1) {
      this.direction = 2;
      elemLeft.style.cssFloat = "left";
      elemRight.style.cssFloat = "right";
      return;
    }
    if (this.width === 0 && this.direction === 2) {
      this.direction = 1;
      elemLeft.style.cssFloat = "right";
      elemRight.style.cssFloat = "left";
      return;
    }
    if (this.width < 100 && this.direction === 1) {
      this.width = this.width + 2;
      elemLeft.style.width = this.width + "%";
      elemRight.style.width = this.width + "%";
      return;
    }
    if (this.width > 0 && this.direction === 2) {
      this.width = this.width - 2;
      elemRight.style.width = this.width + "%";
      elemLeft.style.width = this.width + "%";
      return;
    }
  }

  private setColor(elemLeft, elemRight) {
    var color = this.color;
    if (color == undefined) return;

    elemLeft.style.backgroundColor = color;
    elemRight.style.backgroundColor = color;
  }

  private getSpeed() {
    switch (this.speed) {
      case 3:
        return 10;
      case 1:
        return 23;
      case 2:
      default:
        return 15;
    }
  }
}
