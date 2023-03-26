import { createSlice, nanoid } from "@reduxjs/toolkit";

const initialState = {
  buckets: [
    {
      id: nanoid(),
      name: "Environment Videos",
      cards: [
        {
          id: nanoid(),
          title: "Environment",
          link: "https://www.youtube.com/embed/KA3cWLgAS1M",
        },
      ],
    },
    {
      id: nanoid(),
      name: "School Videos",
      cards: [
        {
          id: nanoid(),
          title: "School",
          link: "https://www.youtube.com/embed/_Xv59lQ2_XU",
        },
      ],
    },
    {
      id: nanoid(),
      name: "Education Videos",
      cards: [
        {
          id: nanoid(),
          title: "Education",
          link: "https://www.youtube.com/embed/nGnX6GkrOgk",
        },
        {
          id: nanoid(),
          title: "Education",
          link: "https://www.youtube.com/embed/kOEDG3j1bjs",
        },
      ],
    },
    {
      name: "Songs",
      id: nanoid(),
      cards: [
        {
          id: nanoid(),
          title: "Jaaniye",
          link: "https://www.youtube.com/embed/H1YR5rsScC8",
        },
        {
          id: nanoid(),
          title: "Hae Krishna",
          link: "https://www.youtube.com/embed/1qmPNot9NJs",
        },
      ],
    },
  ],
};

export const bucketSlice = createSlice({
  name: "buckets",
  initialState,
  reducers: {
    editBucketName: {
      reducer(state, action) {
        const { editedName, id } = action.payload;
        const foundBucket = state.buckets.find((bucket) => bucket.id === id);
        if (foundBucket) {
          foundBucket.name = editedName;
        }
      },
    },
    deleteBucket: {
      reducer(state, action) {
        const { index } = action.payload;
        state.buckets.splice(index, 1);
      },
    },
    addBucket: {
      reducer(state) {
        state.buckets.unshift({
          name: "Bucket Name",
          id: nanoid(),
          cards: [],
          initialEdit: true,
        });
      },
    },
    addCard: {
      reducer(state, action) {
        const { bucketIndex, title, link } = action.payload;
        const newCard = {
          id: nanoid(),
          title,
          link,
        };

        const foundBucket = state.buckets.find(
          (bucket, index) => index === bucketIndex
        );
        foundBucket.cards.unshift(newCard);
      },
    },
    updateCard: {
      reducer(state, action) {
        const { title, link, bucketIndex, cardIndex } = action.payload;
        const foundBucket = state.buckets.find(
          (bucket, index) => index === bucketIndex
        );
        const foundCard = foundBucket.cards[cardIndex];
        foundCard.title = title;
        foundCard.link = link;
      },
    },
    deleteCard: {
      reducer(state, action) {
        const { bucketIndex, cardIndex } = action.payload;
        console.log(action.payload, "deelele");
        state.buckets[bucketIndex].cards.splice(cardIndex, 1);
      },
    },
    toggleInitialEditValue: {
      reducer(state, action) {
        const { index } = action.payload;
        const val = state.buckets[index].initialEdit;
        if (val !== undefined) {
          state.buckets[index].initialEdit = false;
        }
      },
    },
  },
});

export const allBuckets = (state) => state.buckets.buckets;
export const {
  editBucketName,
  addCard,
  updateCard,
  deleteBucket,
  addBucket,
  deleteCard,
  toggleInitialEditValue,
} = bucketSlice.actions;

export default bucketSlice.reducer;
