let x = tf.variable(tf.tensor2d([
    [100, 60],
    [110, 80],
    [130, 120],
    [101, 180],
    [111, 200],
    [100, 250],
    [103, 275],
    [106, 300]
]));
x.print();


let xbar = x.mean(0);
console.log("Mean");
// xbar.print();
tf.moments(x, 0).mean.print();
let xminusxbar = x.sub(tf.moments(x, 0).mean);
console.log("X - E[X]");
xminusxbar.print();

let xvar = tf.moments(x, 0).variance;
let xstd = xvar.sqrt();
console.log("Std");
xstd.print();

Z = xminusxbar.div(xstd);
console.log("Z");
Z.print();

let M = Z.transpose().matMul(Z);
console.log("M");
M.print();

let [q, r] = tf.linalg.qr(M);

// let A = [];
console.log("q");
q.print();
console.log('r');
r.print();

let eigVal_M = r.matMul(q);
let Q = q;
// Q.print();

for( m = 0; m < 100; m++){
    [q, r] = tf.linalg.qr(eigVal_M);
    eigVal_M = r.matMul(q);
    Q = Q.matMul(q);
    // Q.print();
}

console.log("Eigenvalues");
eigVal_M.print();
console.log("lambdaQ");
eigVal_M.matMul(Q).print();
console.log("MQ");
M.matMul(Q).print();

Zstar = Z.matMul(Q).slice([0, 0], [1, 2]);
Zstar.print();