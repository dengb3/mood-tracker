import mongoose from "mongoose";

const moodSchema = new mongoose.Schema({
    object: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Object',
        required: false,
    },
    happy: {
        type: String,
        description: 'How happy did you feel during this activity? Enter a number between 0 and 3, or leave it blank if you do not wish to rate this mood.',
        validate: {
          validator: function(v) {
            return v === "" || (parseInt(v) >= 0 && parseInt(v) <= 3);
          },
          message: props => `${props.value} is not a valid rating. Please enter a number between 0 and 3, or leave it blank.`,
        },
      },
      easy: {
        type: String,
        description: 'How happy did you feel during this activity? Enter a number between 0 and 3, or leave it blank if you do not wish to rate this mood.',
        validate: {
          validator: function(v) {
            return v === "" || (parseInt(v) >= 0 && parseInt(v) <= 3);
          },
          message: props => `${props.value} is not a valid rating. Please enter a number between 0 and 3, or leave it blank.`,
        },
      },
      concentration: {
        type: String,
        description: 'How happy did you feel during this activity? Enter a number between 0 and 3, or leave it blank if you do not wish to rate this mood.',
        validate: {
          validator: function(v) {
            return v === "" || (parseInt(v) >= 0 && parseInt(v) <= 3);
          },
          message: props => `${props.value} is not a valid rating. Please enter a number between 0 and 3, or leave it blank.`,
        },
      },
      motivated: {
        type: String,
        description: 'How happy did you feel during this activity? Enter a number between 0 and 3, or leave it blank if you do not wish to rate this mood.',
        validate: {
          validator: function(v) {
            return v === "" || (parseInt(v) >= 0 && parseInt(v) <= 3);
          },
          message: props => `${props.value} is not a valid rating. Please enter a number between 0 and 3, or leave it blank.`,
        },
      },
      energized: {
        type: String,
        description: 'How happy did you feel during this activity? Enter a number between 0 and 3, or leave it blank if you do not wish to rate this mood.',
        validate: {
          validator: function(v) {
            return v === "" || (parseInt(v) >= 0 && parseInt(v) <= 3);
          },
          message: props => `${props.value} is not a valid rating. Please enter a number between 0 and 3, or leave it blank.`,
        },
      },
      interest: {
        type: String,
        description: 'How happy did you feel during this activity? Enter a number between 0 and 3, or leave it blank if you do not wish to rate this mood.',
        validate: {
          validator: function(v) {
            return v === "" || (parseInt(v) >= 0 && parseInt(v) <= 3);
          },
          message: props => `${props.value} is not a valid rating. Please enter a number between 0 and 3, or leave it blank.`,
        },
      },
      clarity: {
        type: String,
        description: 'How happy did you feel during this activity? Enter a number between 0 and 3, or leave it blank if you do not wish to rate this mood.',
        validate: {
          validator: function(v) {
            return v === "" || (parseInt(v) >= 0 && parseInt(v) <= 3);
          },
          message: props => `${props.value} is not a valid rating. Please enter a number between 0 and 3, or leave it blank.`,
        },
      },
      refreshed: {
        type: String,
        description: 'How happy did you feel during this activity? Enter a number between 0 and 3, or leave it blank if you do not wish to rate this mood.',
        validate: {
          validator: function(v) {
            return v === "" || (parseInt(v) >= 0 && parseInt(v) <= 3);
          },
          message: props => `${props.value} is not a valid rating. Please enter a number between 0 and 3, or leave it blank.`,
        },
      },
    });

export const MoodModel = mongoose.model('Mood', moodSchema);

