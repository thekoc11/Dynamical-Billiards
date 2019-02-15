function convertToTensors(dataset, labels, splitPoint)
{
    const numEx = dataset.length;
    if(numEx !== labels.length){
        throw new Error("Dataset and Labels are not equal in length");
    }

    //Randomly shuffle data and labels

    const indices = [];
    for(i = 0; i < numEx; ++i){
        indices.push(i);
    }

    tf.util.shuffle(indices);

    const shuffeledData = [];
    const shuffledLabels = [];

    for (i =0; i < numEx; ++i){
        shuffeledData.push(dataset[indices[i]]);
        shuffledLabels.push(labels[indices[i]]);
        console.log("Shuffled Data", shuffeledData[i]);
    }

    const numTestEx = Math.round(numEx * splitPoint);
    const numTrainEx = numEx - numTestEx;

    const xDim = shuffeledData[0].length;
    const yDim = shuffledLabels[0].length;

    const xs = tf.tensor2d(shuffeledData, [numEx, xDim]);
    const ys = tf.tensor2d(shuffledLabels, [numEx, 1]);

    const xTrain = xs.slice([0, 0], [numTrainEx, xDim]);
    const xTest = xs.slice([numTrainEx, 0], [numTestEx, xDim]);
    const yTrain = ys.slice([0, 0], [numTrainEx, 1]);
    const yTest = ys.slice([numTrainEx, 0], [numTestEx, 1]);
    return [xTrain, xTest, yTrain, yTest];
}