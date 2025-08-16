export const calculateSkeletonCardsPerPageHandler =
  ({ containerRef, skeletonPerPage, minWidth, height, gap }) =>
  () => {
    if (!containerRef.value) return;

    const containerWidth = containerRef.value.offsetWidth;
    const containerHeight = window.innerHeight;

    const cardsPerRow = Math.floor((containerWidth + gap) / (minWidth + gap));
    const cardsPerColumn = Math.floor((containerHeight + gap) / (height + gap));

    skeletonPerPage.value = cardsPerRow * (cardsPerColumn - 1);
  };
