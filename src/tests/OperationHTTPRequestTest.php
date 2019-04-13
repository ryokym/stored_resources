<?php
require_once(__DIR__.'/../app/lib/autoload.php');
use Operation\OperationHTTPRequest;

class OperationHTTPRequestTest extends \PHPUnit\Framework\TestCase
{

    public function testGetActionType()
    {
        $operation = new OperationHTTPRequest();
        $operation->setActionType('change');
        $test = $operation->getActionType();

        $expected = 'change';
        $this->assertEquals($expected, $test);
    }

    /**
    * @dataProvider requestsProvider
    */
    public function testSetProparties($requests, $results)
    {
        $test = [];
        $operation = new OperationHTTPRequest();
        $operation->setProparties($requests);
        $reflection = new \ReflectionClass($operation);
        foreach($results as $propname => $param) {
            $property = $reflection->getProperty($propname);
            $property->setAccessible(true);
            $test[$propname] = $property->getValue($operation);
        }
        $expected = $results;
        $this->assertEquals($expected, $test);
    }

    public function requestsProvider()
    {
        $firstCase = [
            'dirname' => 'testdir',
        ];
        $secondCase = [
            'dirname' => 'testdir',
            'name'    => 'testname',
            'level'   => 'testlevel',
        ];

        return
        [
            [$firstCase, $firstCase],
            [$secondCase, $secondCase],
        ];
    }
}
