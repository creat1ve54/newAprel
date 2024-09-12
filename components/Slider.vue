<template>

  <p class="filter-price"></p>
</template>
<script setup lang="ts">

const slider = ref(null as unknown as HTMLElement as any);

const props = defineProps({
  value: {
    type: Array<Number>,
    required: true,
  },
  min: {
    type: Number,
    default: 0,
  },
  max: {
    type: Number,
    default: 1000,
  },
});

const emit = defineEmits(["changeRanking"]);

onMounted(() => {
  let paragraph = document.querySelector(".filter-price"),
    text = document.createElement("label"),
    minPriceSpan = document.createElement("span"),
    maxPriceSpan = document.createElement("span"),
    minPriceInput = props.min,
    maxPriceInput = props.max,
    container = document.createElement("div"),
    bar = document.createElement("div"),
    whitePart = document.createElement("div"),
    point1Container = document.createElement("div"),
    point1 = document.createElement("div"),
    point1Number = document.createElement("div"),
    point2Container = document.createElement("div"),
    point2 = document.createElement("div"),
    point2Number = document.createElement("div"),
    multipler = 4;
  if (paragraph) {
    let margin = 0,
      width = 250;
    Array.from(paragraph.children).forEach((e) =>
      e.classList.add("visually-hidden")
    );
    minPriceSpan.textContent = props.min.toString();
    maxPriceSpan.textContent = props.max.toString();
    paragraph?.appendChild(text);
    paragraph?.appendChild(container);
    container.appendChild(bar);
    bar.classList.add("double-bar");
    bar.appendChild(whitePart);
    whitePart.classList.add("white-part");
    whitePart.appendChild(point1Container);
    point1Container.appendChild(point1);
    point1Container.appendChild(point1Number);
    point1Container.classList.add("point-container");
    point1Number.classList.add("number");
    point1.classList.add("point");
    point1Number.appendChild(minPriceSpan);
    whitePart.appendChild(point2Container);
    point2Container.appendChild(point2);
    point2Container.appendChild(point2Number);
    point2Container.classList.add("point-container");
    point2Number.appendChild(maxPriceSpan);
    point2Number.classList.add("number");
    point2.classList.add("point");
    const { left, right } = whitePart.getBoundingClientRect();

    point1.addEventListener("mousedown", (event: MouseEvent) => {
      function trackPoint1(event: MouseEvent) {
        if (event.buttons == 0) {
          window.removeEventListener("mousemove", trackPoint1);
        } else {
          let diff = event.clientX - lastX;
          lastX = event.clientX;
          if (margin + diff < 0 || lastX < left) {
            width += margin;
            minPriceInput = Number(minPriceInput) - margin * multipler;
            margin = 0;
          } else if (width - diff < 24 || lastX - left + 20 > margin + width) {
            margin += width - 24;
            minPriceInput = Number(minPriceInput) + (width - 24) * multipler;
            width = 24;
          } else {
            margin += diff;
            minPriceInput = Number(minPriceInput) + diff * multipler;
            width -= diff;
          }
          whitePart.style.marginLeft = margin + "px";
          whitePart.style.width = width + "px";
          minPriceSpan.textContent = minPriceInput.toString();
        }

        emit("changeRanking", [minPriceInput, maxPriceInput]);
      }

      let lastX = event.clientX;
      event.preventDefault();
      window.addEventListener("mousemove", trackPoint1);
    });

    point2.addEventListener("mousedown", (event: MouseEvent) => {
      function trackPoint2(event: MouseEvent) {
        if (event.buttons == 0) {
          window.removeEventListener("mousemove", trackPoint2);
        } else {
          let diff = event.clientX - lastX;
          lastX = event.clientX;
          if (margin + width + diff > 250 || lastX > right) {
            maxPriceInput =
              Number(maxPriceInput) + (250 - margin - width) * multipler;
            width = 250 - margin;
          } else if (width + diff < 24 || lastX - left - 20 < margin) {
            maxPriceInput = Number(maxPriceInput) - (width - 24) * multipler;
            width = 24;
          } else {
            width += diff;
            maxPriceInput = Number(maxPriceInput) + diff * multipler;
          }
          whitePart.style.width = width + "px";
          maxPriceSpan.textContent = maxPriceInput.toString();
        }

        emit("changeRanking", [minPriceInput, maxPriceInput]);
      }

      let lastX = event.clientX;
      event.preventDefault();
      window.addEventListener("mousemove", trackPoint2);
    });
  }
});
</script>
<style lang="scss">
// .slider {
//   margin-bottom: 32px;

//   .noUi-target {
//     background: #e9edf5;
//     border-radius: 3px;
//     border: none;
//     box-shadow: none;
//     height: 4px;
//   }

//   .noUi-connect {
//     background-color: #000000;
//   }

//   .noUi-handle {
//     width: 16px;
//     height: 16px;
//     right: -11px;
//     top: -7px;
//     border-radius: 100%;
//     background-color: #000000;
//     box-shadow: none;
//     border: none;

//     &::after {
//       display: none;
//     }

//     &::before {
//       display: none;
//     }
//   }

//   .noUi-tooltip {
//     border: none;
//     background: none;
//     padding: 0;
//     top: 20px;
//     bottom: inherit;
//     font-size: 14px;
//     font-weight: 500;
//   }
// }

.filter-price > div {
  display: block;
  width: 250px;
  height: 36px;
  padding: 16px 9px;
  box-sizing: border-box;

  background-color: rgba(255, 255, 255, 0.2);
  border-radius: 30px;
  padding-bottom: 60px;
}

.filter-price .number {
  position: absolute;
  transform: translate(-50%, 0);
  left: 0%;
}

.filter-price .point-container {
  position: relative;
}

.double-bar {
  display: block;
  width: 250px;
  height: 4px;

  background-color: #e9edf5;
  border-radius: 30px;
}

.double-bar .white-part {
  display: flex;
  justify-content: space-between;
  height: 4px;

  background-color: black;
}

.double-bar .point {
  width: 4px;
  height: 4px;
  margin-top: -6px;

  background-color: #ababab;
  border: 8px solid black;
  border-radius: 50%;
}

.double-bar .point:first-child {
  margin-left: -8px;
}

.double-bar .point:last-child {
  margin-right: -8px;
}

.visually-hidden {
  position: absolute;
  clip: rect(0 0 0 0);
  width: 1px;
  height: 1px;
  margin: -1px;
}
</style>
