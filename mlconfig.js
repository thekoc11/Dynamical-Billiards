

function classify(xTrain, xTest, yTrain, yTest) {
    tf.tidy(() => {
        const model = tf.sequential();

        const hidden1 = tf.layers.dense({
            units: 10,
            inputShape: [6],
            activation: 'sigmoid'
        });
        model.add(hidden1);

        // const hidden2 = tf.layers.dense({
        //     units: 4,
        //     // inputShape: [2],
        //     activation: 'softmax'
        // });
        // model.add(hidden2);
        const output = tf.layers.dense({
            units: 2,
            activation: 'softmax'
        });
        model.add(output);

        const sgdOpt = tf.train.adam(0.01);
        model.compile({
            optimizer: sgdOpt,
            loss: 'categoricalCrossentropy',
            metrics: ['accuracy'],
        });

        const _ds = tf.tensor2d([
            [-0.869, 1.254],
            [1.236, 0.214],
            [1.459, 0.514],
            [0.0835, 1.684],
            [1.135, 0.314],
            [1.345, 0.021],
            [0.091, -1.12],
        ]);

        const _ts = tf.tensor2d([
            [0.1, 0.01],
            [0.75, 0.75],
            [1, 1],
            [0.3, 0.3]
        ]);

        const _lv = tf.tensor2d([
            [1],
            [1],
            [0],
            [1],
            [0],
            [0],
            [1]
        ]);

        train().then(() => {
                let _op = model.predict(xTest);
                _op.print();
                yTest.print();
                let correct = 0;
                let _pre = _op.dataSync();
                let _orig = yTest.dataSync();
                for(i = 0; i < _pre.length; ++i){
                    if(Math.abs(_pre[i] - _orig[i]) < 0.5){
                        correct = correct + 1;
                    }
                }
                let accuracy;
                accuracy = (correct/_pre.length)*100;
                console.log("training complete, accuracy is ", accuracy);
            })
            .catch((err) => console.log(err));

        async function train() {
            for (let index = 0; index < 10; index++) {
                const config = {
                    // validationData: [xTest, yTest],
                    epochs: 70,
                    validationSplit: 0.1,
                    shuffle: true,
                    callbacks: {
                        onEpochEnd:(num, log) => {
                            console.log(`Epoch: ${num}`);
                            console.log(`loss: ${log.val_loss}`);
                        }
                    }
                };

                const resp = await model.fit(xTrain, yTrain, config);
                console.log(resp.history.loss[0]);
            }

        }
    });
}