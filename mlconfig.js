function classify(xTrain, xTest, yTrain, yTest) {
    tf.tidy(() => {
        const model = tf.sequential();

        const hidden1 = tf.layers.dense({
            units: 5,
            inputShape: [2],
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
            units: 1,
            activation: 'sigmoid'
        });
        model.add(output);

        const sgdOpt = tf.train.adam(0.01);
        model.compile({
            optimizer: sgdOpt,
            loss: tf.losses.meanSquaredError
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
                console.log("training complete");
            })
            .catch((err) => console.log(err));

        async function train() {
            for (let index = 0; index < 1000; index++) {
                const config = {
                    shuffle: true,
                    epochs: 10
                };

                const resp = await model.fit(xTrain, yTrain, config);
                console.log(resp.history.loss[0]);
            }

        }
    });
}